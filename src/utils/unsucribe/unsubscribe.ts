export type Unsubscribable = { unsubscribe(): void }

/**
 * Handles subscription and unsubscription of Unsubscribable elements
 */
export class UnsubscribeHelper {
    private unsubscribables: Array<Unsubscribable> = [];

    /**
     * Adds a new Unsubscribable element
     * @param subs an Unsubscribable element - like an rxjs subscription
     */
    set subscription(subs: Unsubscribable){
        subs && this.unsubscribables.push(subs);
    }

    /**
     * Adds a new Unsubscribable elements
     * @param subs an array of Unsubscribable elements - like an rxjs subscription
     */
     set subscriptions(subs: Array<Unsubscribable>){
        this.unsubscribables = this.unsubscribables.concat(subs);
    }

    /**
     * Unsubscribes to all the stored subscriptions
     */
    public unsubscribe(): void {
        this.unsubscribables.forEach(sub => sub?.unsubscribe());
        this.unsubscribables = [];
    }
}