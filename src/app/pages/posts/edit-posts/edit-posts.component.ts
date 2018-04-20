
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// store
import { Store, select } from '@ngrx/store';
import * as PostsActions from '../store/actions/posts.actions';

// rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { Subscription } from 'rxjs/Subscription';

// service
import { WppostsService } from '../../../core/wpapi/wpposts.service';

// interface
import { Option } from '../../../interfaces/option.interface';
import { State as PostState } from '../store/reducers/posts/posts.reducer';
import { Router } from '@angular/router';

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
   *
   *
   * @type {Option[]}
   * @memberof EditPostsComponent
   */
  statusOpt: Option[] = [
    {
      label: 'Draft',
      value: 'draft',
    },
    {
      label: 'Publish',
      value: 'publish',
    },
    {
      label: 'Future',
      value: 'future',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
    {
      label: 'Private',
      value: 'private',
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
      value: 'standard',
    },
    {
      label: 'Aside',
      value: 'aside',
    },
    {
      label: 'Chat',
      value: 'chat',
    },
    {
      label: 'Gallery',
      value: 'gallery',
    },
    {
      label: 'Link',
      value: 'link',
    },
    {
      label: 'Image',
      value: 'image',
    },
    {
      label: 'Quote',
      value: 'quote',
    },
    {
      label: 'Status',
      value: 'status',
    },
    {
      label: 'Video',
      value: 'video',
    },
    {
      label: 'Audio',
      value: 'audio'
    }
  ];


  constructor(
    private _fb: FormBuilder,
    private _wpposts: WppostsService,
    private _router: Router,
    private _store: Store<PostState>,
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
        console.log(res);

        if (res.post) {
          this._router.navigate(['../']);
        }

      });
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
      status: [ 'draft', [] ],
      format: [ 'standard', [] ],
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

      const newPost = this.editPostForm.getRawValue();

      this._store.dispatch(new PostsActions.Create(newPost));


    } else {
      throw new Error('表單不合法');
    }

  }

}
