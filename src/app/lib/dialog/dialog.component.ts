import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { DialogService } from './dialog.service';

@Component({ 
    selector: 'dialog', 
    templateUrl: 'dialog.component.html', 
    styleUrls: ['dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent implements OnInit, OnDestroy {
    @Input() id: string;
    private element: any;

    constructor(private dialogService: DialogService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        // ensure id attribute exists
        if (!this.id) {
            console.error('dialog must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);

        // close modal on background click
        this.element.addEventListener('click', el => {
            if (el.target.className === 'dilaog') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.dialogService.add(this);
    }

    // remove self from modal service when component is destroyed
    ngOnDestroy(): void {
        this.dialogService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('dialog');
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('dialog');
    }
}