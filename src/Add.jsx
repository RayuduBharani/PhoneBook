import React from 'react'

const Add = (props) => {
    return (
        <div>
            <button className="button-me btn-sm-2" type="button" data-toggle="modal" data-target="#exampleModal">
                {props.button}
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content background-modal">
                        <div className="modal-header mb-3">
                            <h5 className="phone-book-heading" id="exampleModalLabel">{props.buttonDescription}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <input type="text" className="enter-input" placeholder="Name.." /><br />
                                <input type="tel" id="mobilenumber" maxLength={10} className="enter-input" placeholder="phonenumber.." required />
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button className="button-me" type="submit">{props.button}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add