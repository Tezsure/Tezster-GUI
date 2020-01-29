import React from 'react';

function index() {
  return (
    <div className="help-section-container">
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>FROM</h4>
          </div>
          <div className="cards-contents">
            <input
              type="email"
              className="form-control"
              placeholder="Please Enter Your Email"
            />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>SUBJECT</h4>
          </div>
          <div className="cards-contents">
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter Subject"
            />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="cards">
          <div className="cards-header">
            <h4>HOW CAN WE HELP</h4>
          </div>
          <div className="cards-contents">
            <textarea className="form-control" rows="5" />
          </div>
        </div>
      </div>
      <div className="cards-container">
        <div className="cards">
          <button type="button" className="send-button btn btn-info">
            Send Mail
          </button>
        </div>
      </div>
    </div>
  );
}

export default index;
