Practice for SE026 Weeks 1-6: requirements and layers, delay and throughput, HTTP/DNS and sockets, reliable transfer, and TCP handshake, byte numbers, windows and congestion avoidance.
20 questions; 60 minutes per attempt. A calculator and scratch paper are allowed. Enter numerical answers as a number only in the stated unit.
Write your calculation steps and a short reason for each chosen answer on scratch paper before submitting. You may move back and review answers. Submit the whole attempt to see correct answers and explanations, then retry.
This is an ungraded practice quiz. It practises the same course concepts using different scenarios and values. The formal midterm is a 90-minute paper examination requiring written answers and working; this shorter online quiz is not a copy of that paper.

A classroom video service is being tested by two teams. Both time the same clip, but one uses five wireless clients and the other uses twenty. What must they do before using these results to compare two network designs?

Question 1Select one:[ ] **a.**Repeat a defined workload with the same client count, location and timing rules, and record successful playback as well as elapsed time.

[ ] **b.**Compare only the fastest result from each team.

[ ] **c.**Use one successful ping instead of checking playback.

[ ] **d.**Buy identical new routers before recording any conditions.

[X]

#### Question **2**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A client sends SYN with sequence number 1200. The server sends SYN ACK with sequence number 4000 and acknowledgement 1201. No data is carried. Which pair correctly gives the first DATA byte sequence number for the client and the server?

Question 2Select one:[ ] **a.**Client 1201; server 4001.

[ ] **b.**Client 1202; server 4002.

[ ] **c.**Client 1200; server 4000.

[ ] **d.**Client 1201; server 4000.

[X]

#### Question **3**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

An IP packet crosses two Ethernet links through a router. Assume ordinary forwarding with no NAT and no tunnel. Which description is correct?

Question 3Select one:[ ] **a.**Every router creates a new TCP connection for the user application.

[ ] **b.**The router removes the incoming link frame and forwards the IP packet in a new frame for the next link.

[ ] **c.**The DNS resolver replaces the packet payload at each link.

[ ] **d.**The same Ethernet frame must be forwarded unchanged across both links.

[X]

#### Question **4**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A proposed design must let students read a shared course folder but prevent them from changing its files. Which test best checks that requirement?

Question 4Select one:[ ] **a.**Use a representative student account to read a known file, then attempt a harmless change and check it is denied without changing the original file.

[ ] **b.**Show a topology diagram without testing an account.

[ ] **c.**Only check that the file server responds to ping.

[ ] **d.**Confirm the server has a private IP address.

#### Question **5**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A packet contains 1,500 bytes. The link rate is 80 Mbit/s (80,000,000 bit/s). Calculate transmission delay in milliseconds. Ignore all other delay components. Enter a number only, in ms.

Answer:**Question 5**[ ]

#### Question **6**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A link is 400 km long. Signal propagation speed is 200,000,000 metres per second. Calculate one-way propagation delay in milliseconds. Ignore all other delays. Enter a number only, in ms.

Answer:**Question 6**[ ]

#### Question **7**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

Use a simplified classic AIMD congestion-avoidance model. A window of 8 MSS grows by 1 MSS per RTT for two RTTs, then a congestion signal makes the sender keep half its window. Which sequence of window sizes follows?

Question 7Select one:[ ] **a.**8, 9, 10, 9 MSS.

[ ] **b.**8, 9, 10, 5 MSS.

[ ] **c.**8, 16, 32, 16 MSS.

[ ] **d.**8, 4, 2, 1 MSS.

[X]

#### Question **8**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

One flow transfers a 9 MB file over a path with link rates of 30, 8 and 100 Mbit/s. Use decimal units: 1 MB = 1,000,000 bytes. Assume the slowest link limits sustained rate and ignore setup, headers, loss and competing traffic. Calculate ideal transfer time in seconds. Enter a number only, in s.

Answer:**Question 8**[ ]

#### Question **9**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A DNS command returns an A record for a website hostname. What does this observation directly support?

Question 9Select one:[ ] **a.**The browser has validated the HTTPS certificate.

[ ] **b.**That query returned IPv4 address data for the requested name at that time.

[ ] **c.**The user is authorised to enter every course.

[ ] **d.**The website will return the requested teaching file.

[X]

#### Question **10**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A browser records a response status of 200 OK and a Content-Type header of text/html. Which statement correctly interprets these two fields?

Question 10Select one:[ ] **a.**The status reports the HTTP request outcome; Content-Type describes the returned representation. Neither field alone identifies the exact body contents.

[ ] **b.**Content-Type is a DNS address record.

[ ] **c.**These fields prove the page contains every expected teaching resource.

[ ] **d.**200 OK is the destination port and text/html identifies the router.

[X]

#### Question **11**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A TCP client sends the bytes HELLO followed by a newline. The receiver first reads HE and later LLO followed by the newline. What should a newline-delimited application do?

Question 11Select one:[ ] **a.**Switch the server IP address after the first short read.

[ ] **b.**Assume TCP corrupted the message because one send required two reads.

[ ] **c.**Accumulate the ordered bytes until the delimiter is available, then interpret the complete message.

[ ] **d.**Treat each recv result as a separate complete application message.

[X]

#### Question **12**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A sensor sends frequent recent readings. The application can tolerate an occasional missing reading and has its own freshness and congestion policy. Which choice is reasonable?

Question 12Select one:[ ] **a.**UDP guarantees every reading arrives in order without application support.

[ ] **b.**UDP can be appropriate if the application handles the needed loss, freshness and traffic-control behavior.

[ ] **c.**TCP guarantees every reading arrives before any application deadline.

[ ] **d.**Neither TCP nor UDP can carry sensor readings.

#### Question **13**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

In an alternating-bit stop-and-wait model, the receiver accepts DATA1 and sends ACK1. ACK1 is delayed, so the sender times out. A second DATA1 arrives while the receiver expects DATA0. What should happen?

Question 13Select one:[ ] **a.**Recognise the old label, do not deliver it again, and repeat ACK1.

[ ] **b.**Ignore the duplicate and never send any acknowledgement.

[ ] **c.**Change the received label to DATA0 and deliver it.

[ ] **d.**Deliver the second DATA1 as a new application message.

[X]

#### Question **14**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A sender retransmits after a timeout. The trace does not show whether the original data or acknowledgement was lost or delayed. Which conclusion is justified?

Question 14Select one:[ ] **a.**The physical link rate must have increased.

[ ] **b.**The sender did not receive the expected acknowledgement in time; more evidence is needed to identify the cause.

[ ] **c.**The original data was definitely lost.

[ ] **d.**The receiver definitely delivered the application message twice.

[X]

#### Question **15**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A stop-and-wait sender transmits an 8,000-bit packet on an 8 Mbit/s link. The additional round-trip wait, excluding that packet transmission time, is 9 ms. Assume no loss and negligible acknowledgement transmission/processing. What percentage of each send-and-wait cycle is spent transmitting the packet? Enter the percentage number only (for example, enter 25 for 25%).

Answer:**Question 15**[ ]

#### Question **16**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

Why can pipelining improve utilisation compared with stop-and-wait on a path with a long round-trip delay?

Question 16Select one:[ ] **a.**It removes the need for acknowledgements and duplicate detection.

[ ] **b.**It permits multiple packets to be outstanding, using time that stop-and-wait would spend waiting.

[ ] **c.**It guarantees there will never be congestion.

[ ] **d.**It changes the signal propagation speed.

#### Question **17**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

In an established TCP connection, one segment carries consecutive data bytes numbered 6200 through 6599 inclusive. Ignore SYN/FIN and sequence-number wrap. How many DATA bytes does that segment carry? Enter an integer only.

Answer:**Question 17**[ ]

#### Question **18**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A TCP receiver already has all bytes before 2000. It buffers bytes 2300 through 2499 while 2000 through 2299 are missing. The missing bytes then arrive correctly. What cumulative ACK can it send now? Assume the later bytes remain buffered.

Question 18Select one:[ ] **a.**2300

[ ] **b.**2000

[ ] **c.**2499

[ ] **d.**2500

[X]

#### Question **19**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

Use the simplified TCP window model, with all quantities in BYTES. The receive window is 9000 bytes, congestion window 15000 bytes and 6500 bytes are outstanding (sent but not yet acknowledged). Ignore other limits. How many ADDITIONAL data bytes may the sender send now? Enter an integer only.

Answer:**Question 19**[ ]

#### Question **20**

Not yet answered

Marked out of 1.00

[![](https://moodle.ccun.edu.kh/theme/image.php/moove/core/1795436703/i/unflagged)Flag question]( "Flag this question for future reference")

#### Question text

A student opens a saved course-file link. The browser receives HTTP 200 OK, Content-Type text/html, and a body containing a login form. The intended file is a PDF. What is the best next step?

Question 20Select one:[ ] **a.**Conclude that TCP reordered the PDF into HTML.

[ ] **b.**Declare the intended PDF successfully delivered because the status is 200.

[ ] **c.**Inspect the final URL and returned page, then check the expected sign-in and file-access steps using the intended account.

[ ] **d.**Replace the DNS resolver immediately without further checks.

[X]

You are logged in as [Lor Hengr](https://moodle.ccun.edu.kh/user/profile.php?id=17049)
