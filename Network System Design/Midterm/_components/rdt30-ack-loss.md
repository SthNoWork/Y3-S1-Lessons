```mermaid
sequenceDiagram
  participant S as Sender (expects ACK0)
  participant R as Receiver (expects 0)
  S->>R: "DATA0 (ALPHA)"
  Note over R: "Deliver ALPHA once; now expects 1"
  R--xS: "ACK0 lost on channel"
  Note over S: "Timeout expires (cannot tell DATA vs ACK lost)"
  S->>R: "Retransmit DATA0 (ALPHA)"
  Note over R: "Duplicate 0! Suppress delivery; repeat ACK0"
  R-->>S: "ACK0"
  Note over S: "Advance to DATA1"
```
