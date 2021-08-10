import { Component, OnInit } from '@angular/core';
import {Extended} from '../../shared/models/extended-project.model';
import {extendedService } from '../extended.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-extended-view',
  templateUrl: './extended-view.component.html',
  styleUrls: ['./extended-view.component.css']
})
export class ExtendedViewComponent implements OnInit {
  extended:Extended;
  id = 0;



  // tslint:disable-next-line:no-shadowed-variable
  constructor(private extendedService: extendedService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.extended = this.extendedService.getExtended(this.id);
        }
      );
  }
  onEditProject() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }
  onDeleteProject() {
    this.extendedService.deleteRecipe(this.id);
    this.router.navigate(['/projects']);
  }

}
