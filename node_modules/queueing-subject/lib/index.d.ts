import { Subject, Subscriber, Subscription } from 'rxjs';
export declare class QueueingSubject<T> extends Subject<T> {
    private queuedValues;
    next(value: T): void;
    _subscribe(subscriber: Subscriber<T>): Subscription;
}
