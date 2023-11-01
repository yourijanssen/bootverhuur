import { Component } from '@angular/core';
import { Boat } from 'src/app/interfaces/boat';
import { BoatService } from 'src/app/services/boat.service';

/**
 * @author Youri Janssen
 * Boat component for displaying and searching boats.
 */
@Component({
    selector: 'app-boat',
    templateUrl: './boat.component.html',
    styleUrls: ['./boat.component.css']
})
export class BoatComponent {
    /** An array of Boat objects that match the search criteria. */
    public searchedBoats: Boat[] = [];
    public searchTerm = '';

    /**
     * @author Youri Janssen
     * Creates an instance of BoatComponent.
     * @param boatService - The BoatService used to search for boats.
     */
    constructor(private boatService: BoatService) {}

    /**
     * @author Youri Janssen
     * Searches for boats based on the provided name.
     * @param searchTerm - The searchTerm of the boat to search for.
     */
    searchBoats(searchTerm: string): void {
        if (searchTerm.trim() === '') {
            return; // Do nothing if the search term is empty or contains only white spaces
        }
        if (searchTerm.length > 150) {
            alert('The boat name cannot contain more than 150 characters.');
            return;
        }
        this.boatService.searchBoats(searchTerm).subscribe(
            data => {
                this.searchedBoats = data;
                this.checkAlphabeticalOrder();
            },
            error => {
                console.error('An error occurred:', error);
            }
        );
    }

    /**
     * @author Youri Janssen
     * Checks if the Boat names are returned in alphabetical order.
     * @returns A boolean value indicating whether the names are in alphabetical order.
     */
    checkAlphabeticalOrder(): boolean {
        for (let i = 0; i < this.searchedBoats.length - 1; i++) {
            // Check if the current element is greater than the next element
            if (
                this.searchedBoats[i].name.localeCompare(
                    this.searchedBoats[i + 1].name
                ) > 0
            ) {
                // Return false if the current element is greater than the next element
                return false;
            }
        }
        return true;
    }
}
