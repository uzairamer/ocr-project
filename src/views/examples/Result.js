import React from "react";

// reactstrap components
import {
    Button,
    Modal
} from "reactstrap";

import "../../assets/vendor/nucleo/css/nucleo-svg.css"
import "../../assets/css/argon-design-system-react.css";
import "../../assets/css/my-css.css";

class Result extends React.Component {
    
    state = {
        defaultModal: true,
    }
    constructor(props) {
        super(props)
        this.fileInputref = React.createRef();
    }
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    toggleModal = state => {
        // this.setState({
        //     [state]: !this.state[state]
        // });
    };
    handleCopy = () => {
        navigator.clipboard.writeText(
            `Extracted: ${this.props.history.location.state.extracted}
Translated: ${this.props.history.location.state.translated}
            `
        )
    }
    render() {
        return (
            <>
                {/* <DemoNavbar /> */}
                <main ref="main">
                    <Modal
                        className="modal-dialog-centered"
                        isOpen={this.state.defaultModal}
                        toggle={() => this.toggleModal("defaultModal")}
                    >
                        <div className="modal-header">
                            <h4 className="modal-title" id="modal-title-default">
                                OCR Result
                            </h4>
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => this.props.history.replace('/upload')}
                            >
                                <span aria-hidden={true}>x</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h3><strong>Extracted Text:</strong></h3>
                            <h5>
                                {this.props.history.location.state.extracted}
                            </h5>
                            <h3><strong>Translated Text:</strong></h3>
                            <h5>
                                {this.props.history.location.state.translated}
                            </h5>
                            <br />
                            <h5><strong>Translation:</strong> {this.props.history.location.state.lang}</h5> <></>
                        </div>
                        <div className="modal-footer">
                            <Button color="primary" type="button" onClick={this.handleCopy}>
                                <span className="btn-inner--icon mr-1">
                                    <i className="fa fa-clone" />
                                </span>
                                &nbsp; Copy
                            </Button>
                            <Button
                                className="ml-auto"
                                color="link"
                                data-dismiss="modal"
                                type="button"
                                onClick={this.handleCopy}
                            >
                                Export
                            </Button>
                        </div>
                    </Modal>
                    <section className="section section-shaped section-lg" style={{ 'height': '100vh' }}>
                        <div className="shape shape-style-1 shape-default">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                    </section>
                </main>
                {/* <SimpleFooter /> */}
            </>
        );
    }
}

export default Result;
