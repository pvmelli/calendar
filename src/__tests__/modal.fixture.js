export default `<div class="modal-content" id="modal-content">
<div id="event-modal">
<div class="modal-title" id="event-modal-title">
    <button id="close-modal-button">x</button>
</div> 
<form id="event-information" data-selected="test-keyword"><input type="text" id="summary-modif" class="form-control" value="test summary">
<strong class="text-muted">Status: pending</strong><div class="duration-container">
<input type="number" class="form-control date-control" value="1920"><input class="date-control date-non" value="-" disabled="">
<input type="number" class="form-control date-control" value="04"><input class="date-control date-non" value="-" disabled="">
<input type="number" class="form-control date-control" value="22"><input class="date-control date-non" value="at" disabled="">
<input type="number" class="form-control date-control" value="22"><input class="date-control date-non" value=":" disabled="">
<input type="number" class="form-control date-control" value="43"><input class="date-control date-non" value="TO" disabled="">
<input type="number" class="form-control date-control" value="1920"><input class="date-control date-non" value="-" disabled="">
<input type="number" class="form-control date-control" value="04"><input class="date-control date-non" value="-" disabled="">
<input type="number" class="form-control date-control" value="22"><input class="date-control date-non" value="at" disabled="">
<input type="number" class="form-control date-control" value="23"><input class="date-control date-non" value=":" disabled="">
<input type="number" class="form-control date-control" value="43"></div><textarea id="description-modif" class="form-control" value="test description"></textarea>
<div class="row creation-info"><div class="col"><h5>You created this event</h5></div><div class="separator">
</div><div class="col"><ul><li>Created: 2020-04-26T22:39:50.984Z</li><li>Updated: 2020-06-05T23:37:20.724Z</li></ul>
</div></div><div class="row attendee-box"><div class="col person"><strong>You were invited!</strong><br><p>Will you attend?</p>
<div><input class="custom-radio form-check-input radio-btn" type="radio" name="attending" id="yes-radio" value="true"><label class="form-check-label radio-label" for="yes">yes</label></div>
<div><input class="custom-radio form-check-input radio-btn" type="radio" name="attending" id="no-radio" value="false"><label class="form-check-label radio-label" for="no">no</label></div></div><div class="col person"><strong>Test2 Test</strong><p class="text-muted">test2@test.com</p><p class="text-muted">Invited</p><p>Haven't responded</p></div><div class="col person"><strong>Test3 Test</strong><p class="text-muted">test3@test.com</p><p class="text-muted">Invited</p><p>Haven't responded</p></div></div>
<div class="button-container"><button type="button" class="btn btn-dark">SAVE CHANGES</button></div></form>
</div>
</div>

<div id="testEventDisplay" data-keyword="test-keyword"></div>`