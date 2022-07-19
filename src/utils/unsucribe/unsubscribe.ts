export type Unsubscribable = { unsubscribe(): void }

export class UnsubscribeHelper {
    private subscriptions: Array<Unsubscribable> = [];

    set subscription(subs: Unsubscribable){
        subs && this.subscriptions.push(subs);
    }

    public unsubscribe(): void {
        this.subscriptions.forEach(sub => sub?.unsubscribe());
        this.subscriptions = [];
    }
}