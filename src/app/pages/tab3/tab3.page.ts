import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { NgForm } from '@angular/forms';
import { UiServiceService } from '../../services/ui-service.service';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private UiService: UiServiceService,
              private postsService: PostsService) {}


  ngOnInit() {

    this.usuario = this.usuarioService.getUsuario();
    
  }

  async actualizar(fActualizar: NgForm){
    if(fActualizar.invalid){return;}
    console.log(this.usuario);
    
    const actualziado = await this.usuarioService.actualziarUsuario(this.usuario);

    if(actualziado){
      this.UiService.presentToast("Registro actualizado");
    }else{
      this.UiService.presentToast("No se pudo actualizado");
    }

  }

  logout(){

    this.postsService.paginaPosts = 0;
    this.usuarioService.logout();
  }

}
