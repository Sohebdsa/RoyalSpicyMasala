1. Initial Load
When the website loads:

Collect all 192 images (frames).

Begin auto-playing frames sequentially from 1 → 192.

If the user interacts (click, scroll, keypress, etc.):

Stop auto-play immediately.

Hand control over to the user.

2. Scroll Behavior
Case A: Sequence not fully played yet (frame < 192)

On scroll, continue playing from the last frame reached until frame 192.

User scroll action should not reset playback; it resumes from the current frame.

Case B: Sequence fully played (frame = 192)

On scroll, play the sequence backward (192 → 1).

Do not block scrolling while backward playback happens — scrolling continues normally.

Backward playback runs in parallel with scrolling.

3. User Control Priority
User interaction (scroll, click, drag) always overrides auto-play.

Scrolling should feel natural:

Forward playback continues until 192 if not finished.

Backward playback starts if fully played.

Scrolling is never paused or delayed for playback.

4. General Rules
Auto-play only runs once (1 → 192) unless interrupted.

Backward playback only triggers after full forward playback.

User scroll = master control:

If forward playback is incomplete → continue forward.

If forward playback is complete → play backward while scrolling.

Playback should be smooth and synced with scroll, but scrolling is never blocked.