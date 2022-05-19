import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Modal
} from "reactstrap";

import "../../assets/vendor/nucleo/css/nucleo-svg.css"
import "../../assets/css/argon-design-system-react.css";
import "../../assets/css/my-css.css";
import ImageToText from "components/ImageToText";

class ImageUpload extends React.Component {
  state = {
    image: '',
    imageSize: 0,
    showImageContainer: false,
    uploadButtonDisabled: false,
    imageFile: null,
    language: 'Choose Lanugage',
    defaultModal: false,
    extracted: '',
    translated: '',
    languages: {}

  }
  constructor(props) {
    super(props)
    this.fileInputref = React.createRef();
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
    fetch('https://ocr-project-349306.ew.r.appspot.com/process/languages')
      .then(response => {
        this.setState({ uploadButtonDisabled: false })
        if (!response.ok) {

        }
        // this.toggleModal("defaultModal")
        return response.json()
      })
      .then(data => {
        this.handleLanguagesAPICall(data)
        // this.props.history.push('/upload')
      });

  }
  handleLanguagesAPICall = (languages) => {
    const languagesMap = {}
    for (const language of languages['languages']){
      languagesMap[language['name']] = language['code']
    }
    this.setState({languages: languagesMap})
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };
  handleFileRefClick = () => {
    this.fileInputref.current.click();
  }

  handleOCRResponse = (text) => {
    this.props.history.push('/result', {extracted: text['data']['input'], translated: text['data']['text'], lang: text['data']['lang'][0]})
    // this.setState({extracted, translated})
  }
  handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append("file", this.state.imageFile);
    formData.append('language', this.state.languages[this.state.language]);

    const requestOptions = {
      method: 'POST',

      body: formData,
    };
    // this.setState({ uploadButtonDisabled: true })
    // axios.post('https://ocr-project-349306.ew.r.appspot.com/process/upload', this.state.imageFile,{
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    this.setState({ uploadButtonDisabled: true })
    fetch('https://ocr-project-349306.ew.r.appspot.com/process/upload', requestOptions)
      .then(response => {
        this.setState({ uploadButtonDisabled: false })
        if (!response.ok) {

        }
        // this.toggleModal("defaultModal")
        return response.json()
      })
      .then(data => {
        this.handleOCRResponse(data)
        // this.props.history.push('/upload')
      });
  }

  handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      let filename = e.target.files[0];
      console.log(filename)
      this.setState({ image: URL.createObjectURL(filename), imageSize: filename.size / 1000 + ' KB', showImageContainer: true, imageName: filename.name, imageFile: filename })
    }
  }
  handleLanguage = (value) => {
    this.setState({ 'language': value })
  }
  render() {
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main">
          <ImageToText />
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.defaultModal}
            toggle={() => this.toggleModal("defaultModal")}
          >
            <div className="modal-header">
              <h6 className="modal-title" id="modal-title-default">
                OCR Output
              </h6>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("defaultModal")}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <h5>Extracted Text:</h5>
              <p>
                {this.state.extracted}
              </p>
              <h5>Translated Text:</h5>
              <p>
               {this.state.translated}
              </p>
              <p>Translation: {this.state.language}</p>
            </div>
            <div className="modal-footer">
              <Button
                className="ml-auto"
                color="link"
                data-dismiss="modal"
                type="button"
                onClick={() => this.toggleModal("defaultModal")}
              >
                Close
              </Button>
            </div>
          </Modal>
          <section className="section section-shaped section-lg"  style={{'height': '100vh'}}>
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
            <Container className="lg-7">
              <Row className="justify-content-center">
                <Col lg="8" className="">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-muted text-center mb-3">
                        <h4><strong>Upload your image</strong></h4>
                        <p>JPG and PNG files are allowed</p>
                      </div>
                      <div
                        className="dotted-border text-center">
                        <i className="ni ni-cloud-upload-96 upload-icon"></i>
                        <div className="text-muted text-center mb-3">
                          <input accept="image/jpeg, image/png" type="file" ref={this.fileInputref} style={{ 'display': 'none' }} onChange={this.handleFileChange} />
                          <Button
                            className="btn-neutral btn-icon"
                            color="default"
                            href="#pablo"
                            onClick={this.handleFileRefClick}
                          >
                            Choose Image
                          </Button>
                        </div>
                        <div className="text-center">
                          <UncontrolledDropdown>
                            <DropdownToggle caret color="default">
                              {this.state.language}
                            </DropdownToggle>
                            <DropdownMenu style={{'height': '40vh', 'overflow-y': 'scroll'}}>
                              {Object.keys(this.state.languages).map(language => <li>
                                <DropdownItem href={`#${language}`} onClick={() => this.handleLanguage(language)}>
                                  &nbsp; {language}
                                </DropdownItem>
                              </li>)}
                              {/* <li>
                                <DropdownItem href="#pablo" onClick={() => this.handleLanguage('FR')}>
                                  <img
                                    alt="..."
                                    src={require("assets/img/icons/common/FR.webp")}
                                  />
                                  &nbsp; FR
                                </DropdownItem>
                              </li> */}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      </div>
                      {
                        this.state.showImageContainer ? <div><Row style={{ marginTop: '30px' }}>
                          <Col lg="3">
                            <div style={{ 'borderRadius': '50%' }}>
                              <img src={this.state.image} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10%' }} />
                            </div>
                          </Col>
                          <Col lg="9">
                            <Row>{this.state.imageName}</Row>
                            <Row>{this.state.imageSize}</Row>
                          </Col>

                        </Row>
                          <div className="text-center">
                            {
                              this.state.uploadButtonDisabled ? <button class="btn btn-primary btn-sm mb-2" type="button" disabled>
                                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                &nbsp; Loading...
                              </button> : <Button className="btn-1" color="primary" outline type="button" onClick={this.handleUpload}>
                                Upload
                              </Button>
                            }

                          </div></div> : null
                      }

                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
        {/* <SimpleFooter /> */}
      </>
    );
  }
}

export default ImageUpload;
