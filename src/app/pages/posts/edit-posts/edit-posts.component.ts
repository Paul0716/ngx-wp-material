
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ngx-material
import { MatDialog } from '@angular/material';

// store
import { Store, select } from '@ngrx/store';
import * as PostsActions from '../store/actions/posts.actions';
import * as TagsActions from '../store/actions/tags.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

// service
import { WppostsService } from '../../../core/wpapi/wpposts.service';
import { WptagService } from '../../../core/wpapi/wptag.service';


// interface
import { Option } from '../../../interfaces/option.interface';
import { State as PostState } from '../store/reducers/posts/posts.reducer';
import { PostStatus } from '../../../enum/wp/post-status.enum';
import { PostFormat } from '../../../enum/wp/post-format.enum';

// ckeditor
declare var ClassicEditor;

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.scss']
})
export class EditPostsComponent implements OnInit, OnDestroy {

  /**
   * 新增文章表單
   *
   * @type {FormGroup}
   * @memberof EditPostsComponent
   */
  public editPostForm: FormGroup;

  /**
   * ckeditor 物件
   *
   * @private
   * @memberof EditPostsComponent
   */
  private _editor;

  /**
   * ckeditor 內容變更的訂閱物件
   *
   * @private
   * @type {Subscription}
   * @memberof EditPostsComponent
   */
  private _newPostContent: Subscription;

  /**
   * 標籤選項列表
   *
   * @memberof EditPostsComponent
   */
  public tags = [];

  /**
   *
   *
   * @type {Option[]}
   * @memberof EditPostsComponent
   */
  statusOpt: Option[] = [
    {
      label: 'Draft',
      value: PostStatus.draft,
    },
    {
      label: 'Publish',
      value: PostStatus.publish,
    },
    {
      label: 'Future',
      value: PostStatus.future,
    },
    {
      label: 'Pending',
      value: PostStatus.pending,
    },
    {
      label: 'Private',
      value: PostStatus.private,
    }
  ];

  /**
   *
   *
   * @type {Option[]}
   * @memberof EditPostsComponent
   */
  formatOpt: Option[] = [
    {
      label: 'Standard',
      value: PostFormat.standard,
    },
    {
      label: 'Aside',
      value: PostFormat.aside,
    },
    {
      label: 'Chat',
      value: PostFormat.chat,
    },
    {
      label: 'Gallery',
      value: PostFormat.gallery,
    },
    {
      label: 'Link',
      value: PostFormat.link,
    },
    {
      label: 'Image',
      value: PostFormat.image,
    },
    {
      label: 'Quote',
      value: PostFormat.quote,
    },
    {
      label: 'Status',
      value: PostFormat.status,
    },
    {
      label: 'Video',
      value: PostFormat.video,
    },
    {
      label: 'Audio',
      value: PostFormat.audio,
    }
  ];


  constructor(
    private _fb: FormBuilder,
    private _wpposts: WppostsService,
    private _wptag: WptagService,
    private _router: Router,
    private _store: Store<PostState>,
    private _dialog: MatDialog,
  ) { }


  /**
   * component init.
   *
   * @memberof EditPostsComponent
   */
  ngOnInit(): void {
    // editor init
    this.initForm();

    this.ckEditorInit();


    this._store
      .pipe(
        select('posts')
      )
      .subscribe( (res: any) => {
        if (res.post) {
          this._router.navigate(['../']);
        }

      });


    this._store
      .pipe(
        select('tags')
      )
      .subscribe( (res: any) => {
        this.tags = res.tags;
      });

    this._store.dispatch(new TagsActions.List());
  }

  /**
   * component destroy.
   *
   * @memberof EditPostsComponent
   */
  ngOnDestroy(): void {

    // destory ckeditor
    this._editor.destroy();

    this._newPostContent.unsubscribe();
  }




  /**
   * 表單初始化
   *
   * @memberof EditPostsComponent
   */
  initForm(): void {
    this.editPostForm = this._fb.group({
      title: [ '', [ Validators.required ] ],
      content: [ '', [ Validators.required ] ],
      status: [ PostStatus.draft, [] ],
      format: [ PostFormat.standard, [] ],
      tags: [ [], [] ],
    });
  }

  /**
   * ckeditor 初始化
   *
   * @memberof EditPostsComponent
   */
  ckEditorInit() {
    const editorEl = document.querySelector('#ckeditor');
    ClassicEditor
      .create(editorEl)
      .then( editor => {

        this.bindingCKEditor(editor);
        this._editor = editor;

      })
      .catch(error => console.error );
  }

  /**
   * 綁定 ckeditor 的事件
   *
   * @param {*} editor
   * @memberof EditPostsComponent
   */
  bindingCKEditor(editor: any) {
    this._newPostContent = Observable.
      fromEvent(editor.model.document, 'change')
      .subscribe( writer => {

        this.editPostForm.patchValue({
          content: this._editor.getData(),
        });

      });
  }

  /**
   * 發布文章
   *
   * @param ev - click mouse event
   * @memberof EditPostsComponent
   */
  postPublish(ev) {
    if (this.editPostForm.valid) {

      const post = this.editPostForm.getRawValue();
      post.tags = post.tags.map(o => o = o.id);

      this._store.dispatch(new PostsActions.Create(post));


    } else {
      throw new Error('表單不合法');
    }

  }

  /**
   * 取得目前 post status的顯示標籤
   *
   * @readonly
   * @memberof EditPostsComponent
   */
  get currentStatusLabel() {
    return this.statusOpt.filter( o => o.value === this.rawPostValue.status )[0].label;
  }

  /**
   * 取得目前 post format的顯示標籤
   *
   * @readonly
   * @memberof EditPostsComponent
   */
  get currentFormatLabel() {
    return this.formatOpt.filter(o => o.value === this.rawPostValue.format)[0].label;
  }

  /**
   * 取得表單目前的值
   *
   * @readonly
   * @memberof EditPostsComponent
   */
  get rawPostValue() {
    return this.editPostForm.getRawValue();
  }

  /**
   * 新增tag 到 reactive form
   *
   * @memberof EditPostsComponent
   */
  addTag(inputEl: HTMLInputElement) {
    const value = inputEl.value;
    const ctrl = this.editPostForm.get('tags');
    const ctrlVal = ctrl.value;

    this._wptag.createTag({
      name: value
    }).subscribe( (response) => {

      if (ctrlVal.indexOf(value) === -1) {
        ctrlVal.push({
          ...response
        });
        ctrl.setValue(ctrlVal);
        inputEl.value = '';
      }

    });
  }

  /**
   * 新增標籤到 post 的 formgroup
   *
   * @param {MouseEvent} ev
   * @param {any} tag
   * @memberof EditPostsComponent
   */
  addTagToCtrl(ev: MouseEvent, tag: any) {

    const value = tag.name;
    const ctrl = this.editPostForm.get('tags');
    const ctrlVal = ctrl.value;

    if (!ctrlVal.filter( o => o.name == value ).length) {
      ctrlVal.push({
        ...tag
      });
      ctrl.setValue(ctrlVal);
    }
  }

  /**
   * 移除標籤
   *
   * @param {MouseEvent} ev
   * @param {any} tag
   * @memberof EditPostsComponent
   */
  removeTag(ev: MouseEvent, tag: any) {

    const tagId = tag.id;
    const ctrl = this.editPostForm.get('tags');
    const ctrlVal = ctrl.value;

    const targetTag = ctrlVal.filter(o => o.id === tagId)[0];
    if (targetTag) {
      const index = ctrlVal.indexOf(targetTag);
      ctrlVal.splice(index, 1);
    }

  }


}
