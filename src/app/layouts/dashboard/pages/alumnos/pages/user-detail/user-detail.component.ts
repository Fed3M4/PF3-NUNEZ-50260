import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../../../../../../core/services/alumnos.service';
import { Alumnos } from '../../../../../../shared/models/interfaces';
import { LoadingService } from '../../../../../../core/services/loading.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userFinded?: Alumnos
  constructor(private route: ActivatedRoute, private alumnosService: AlumnosService, private loadingService: LoadingService, private router: Router){
    this.alumnosService.getAlumnosByID(this.route.snapshot.params['id']).subscribe({
      next: (findedUser) => {
        console.log(findedUser)
        this.userFinded = findedUser
        // this.router.navigate(['dashboard', 'alumnos', ':id'], {
        //   queryParams: {
        //     nombre: findedUser?.firstName,
        //     apellido: findedUser?.lastName
        //   }
        // })
      },
    })
  }
}
