import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = []

  habilitado = true;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    
    this.siguientes();

    this.postsService.nuevoPost
      .subscribe(post => {

        this.posts.unshift(post);

      });

  }

  recargar( event){
    this.siguientes(event, true);
  }


  siguientes( event?, pull: boolean = false ){

    if(pull){
      this.posts = [];
      this.habilitado = true;
    }

    this.postsService.getPosts( pull ).subscribe( resp => {
      console.log(resp);
      this.posts.push(...resp.post);

      if( event ){

        event.target.complete();

        if(resp.post.length === 0){

          this.habilitado = false;

        }

      }
    });

  }

}
