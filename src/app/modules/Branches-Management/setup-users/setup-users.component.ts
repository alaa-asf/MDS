import { Component, OnInit } from '@angular/core';
import { BrancheManagementService } from 'src/app/shared/Apis/branches-management.service';
import { UsersService } from 'src/app/shared/Apis/users.service';

@Component({
  selector: 'app-setup-users',
  templateUrl: './setup-users.component.html',
  styleUrls: ['./setup-users.component.scss']
})
export class SetupUsersComponent implements OnInit {
  roles: any = [];
  role: any;
  usersData: any = [];
  constructor(private _usersService: UsersService, private _brancheManagementService: BrancheManagementService) { }

  ngOnInit() {
    this.getAllRoles();
  }

  getAllRoles() {
    this._usersService.getٌRoles().subscribe((res: any) => {
      this.roles = res;
    })
  }

  getData(rank: any) {
    this._brancheManagementService.getUsersByRank(rank).subscribe((res: any) => {
      console.log(res);
      this.usersData = res;
    })
  }

  editUser(id: any) {

  }

  deleteUser(id: any) {

  }
}
