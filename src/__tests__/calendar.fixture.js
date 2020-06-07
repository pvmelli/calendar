export default `<div class="container-fluid">
<div class="event-modal not-display" id="instructions">
  <div class="modal-content" id="instructions-container">
    <div class="modal-title" id="instructions-title">
      <button id="close-instructions-button">x</button>
    </div>
    <div id="instructions-content">
      <div class="instructions-box">
      <a class="fa fa-check-square-o"></a><p>Click on this icon to mark an event as <b>confirmed</b></p><br>
      </div>
      <div class="instructions-box">
      <a class="fa fa-trash-o"></a><p>Click on this icon to mark an event as <b>cancelled</b></p><br>
      </div>
      <div class="instructions-box">
      <a class="fa fa-cog"></a><p>Click on this icon to see and <b>modify</b> event details</p>
      </div>
    </div>
  </div>
</div>
</div>
  
<div class="container-fluid">
    <div class="event-modal not-display" id="event-modal">
      <div class="modal-content" id="modal-content">
        <div class="modal-title" id="event-modal-title">
            <button id="close-modal-button">x</button>
        </div> 
        <div id="event-content">
        </div>
    </div>
  </div>
</div>


  <div class="container-fluid">
      <div class="row top-row">
        <div class="col">
          <input type="week" value="2020-W17" id="week-input">

        </div>
        <div class="col" id="month-title">

        </div>
        <div class="col">

        </div>
      </div>

      <div class="row">
        <div class="col">

        </div>
          <div class="col-12">
              <div class="row" id="calendar-container">

              </div>
          </div>
        </div>

        <div class="row">
          <div class="col">

          </div>
          <div class="col">

          </div>
          <div class="col">

          </div>
        </div>


    </div>  


    <script type="module" src="./index.js"></script>`