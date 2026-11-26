```event-storming
context: Ordering
actor: Customer
command: PlaceOrder
event: OrderPlaced / OrderAccepted
hotspot: "Restaurant never accepts?"

context: Payment
actor: KHQR
command: AuthorisePayment
event: PaymentAuthorised

context: Delivery
actor: Rider
command: AssignRider
event: RiderAssigned -> OrderDelivered
```
