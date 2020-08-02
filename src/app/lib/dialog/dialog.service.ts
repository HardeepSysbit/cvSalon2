import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DialogService {
    private dialogs: any[] = [];

    add(dialog: any) {
        // add modal to array of active modals
        this.dialogs.push(dialog);
    }

    remove(id: string) {
        // remove modal from array of active modals
        this.dialogs = this.dialogs.filter(x => x.id !== id);
    }

    open(id: string) {
        // open modal specified by id
        const dialog = this.dialogs.find(x => x.id === id);
        dialog.open();
    }

    close(id: string) {
        // close modal specified by id
        const dialog = this.dialogs.find(x => x.id === id);
        dialog.close();
    }
}