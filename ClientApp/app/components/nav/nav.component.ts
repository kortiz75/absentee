﻿import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from "../../nav-item";

@Component({
    selector: 'navigation',
    templateUrl: '/nav.component.html',
    styleUrls: ['/nav.component.css']
})
export class NavComponent {
    navItems: NavItem[] = [new NavItem("calendar", "Calendar", true), new NavItem("absence", "Add Absence", false), new NavItem("editUser", "Edit User", false)];
    public isKonamiCode: boolean = false;
    public b: string = "";
    public a: string = "";
    public m: string = "";
    constructor(private router: Router) {
        this.router.navigate(['calendar']);
    }

    onSelectNav(nav: NavItem) {
        this.navItems.forEach((navItem) => navItem.isActive = false);
        nav.isActive = true;
        if (nav.name === 'Calendar') {
            this.router.navigate(['calendar']);
        }
        if (nav.name === 'Add Absence') {
            this.router.navigate(['addabsence']);
        }
        if (nav.name === 'Edit User') {
            this.router.navigate(['edituser']);
        }
    }

    @HostListener('document:keypress', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.key === "B" && this.b === "") {
            this.b = event.key;
        } else if (event.key === "A" && this.a === "" && this.b === "B") {
            this.a = event.key;
        }else if (event.key === "M" && this.m === "" && this.b === "B" && this.a === "A") {
            this.m = event.key;
        } else {
            this.clearKonami();
        }
        if (this.b === "B" && this.a === "A" && this.m === "M") {
            this.isKonamiCode = true;
            setTimeout(() => {
                this.isKonamiCode = false;
                this.clearKonami();
            }, 4000);
        }
    }

    private clearKonami() {
        this.b = "";
        this.a = "";
        this.m = "";
    }
}