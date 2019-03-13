import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import UrlAssembler from 'url-assembler';
import style from './Endpoint.scss';

const InputGroup = (props) => {
  const {
    title,
    params,
    handler,
  } = props;
  return (
    <div className={style.inputGroup}>
      <span className={style.inputGroupTitle}>
        {`${title} / `}
      </span>
      <span className={style.params}>
        {Object.entries(params).map(([key, value]) => (
          <span key={key} className={style.param}>
            <label htmlFor={key}>
              <tt>{key}</tt>
              <input
                type="text"
                className="form-control d-inline"
                size="8"
                name={key}
                value={value}
                onChange={handler}
              />
            </label>
          </span>
        ))}
      </span>
    </div>
  );
};

InputGroup.propTypes = {
  title: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
  handler: PropTypes.func.isRequired,
};

class Endpoint extends Component {
  constructor(props) {
    super(props);
    const {
      method,
      path,
      pathParams,
      queryParams,
    } = props;
    this.state = {
      modal: false,
      method,
      path,
      pathParams,
      queryParams,
      response: '',
    };
    this.onPathParamsChangeHandler = this.onPathParamsChangeHandler.bind(this);
    this.onQueryParamsChangeHandler = this.onQueryParamsChangeHandler.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onPathParamsChangeHandler(e) {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { pathParams } = prevState;
      pathParams[name] = value;
      return { pathParams };
    });
  }

  onQueryParamsChangeHandler(e) {
    const { name, value } = e.target;
    this.setState((prevState) => {
      const { queryParams } = prevState;
      queryParams[name] = value;
      return { queryParams };
    });
  }

  toggle() {
    const {
      method,
      modal,
    } = this.state;
    if (!modal) {
      fetch(this.buildUrl(), {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((data) => {
          this.setState({
            response: data,
            modal: true,
          });
        });
    } else {
      this.setState({
        modal: false,
      });
    }
  }

  buildUrl() {
    const {
      path,
      pathParams,
      queryParams,
    } = this.state;
    let builder = UrlAssembler('/api').template(path);
    Object.entries(pathParams).forEach(([key, value]) => {
      builder = builder.param(key, value);
    });
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) {
        builder = builder.query(key, value);
      }
    });
    return builder.toString();
  }

  render() {
    const {
      method,
      path,
      children,
    } = this.props;
    const {
      pathParams,
      queryParams,
      modal,
      response,
    } = this.state;
    return (
      <tr className={style.endpoint}>
        <td nowrap="nowrap" className={style.method}>{method}</td>
        <td nowrap="nowrap" className={style.path}>{path}</td>
        <td nowrap="nowrap" className={style.description}>{children}</td>
        <td nowrap="nowrap" className={style.tryItOut}>
          {!_.isEmpty(pathParams) && (
            <InputGroup
              title="path"
              params={pathParams}
              handler={this.onPathParamsChangeHandler}
            />
          )}
          {!_.isEmpty(queryParams) && (
            <InputGroup
              title="query"
              params={queryParams}
              handler={this.onQueryParamsChangeHandler}
            />
          )}
          <div className={style.launchpad}>
            <span className={style.http}>
              <tt>{`${method} ${this.buildUrl()}`}</tt>
            </span>
            <span className={style.go}>
              <button type="button" onClick={this.toggle}>
                <span className="fas fa-angle-right" />
              </button>
            </span>
          </div>
          <Modal isOpen={modal} toggle={this.toggle}>
            <ModalHeader>Response</ModalHeader>
            <ModalBody>
              <code className="prettyprint lang-javascript">
                {JSON.stringify(response, null, 2)}
              </code>
            </ModalBody>
            <ModalFooter>
              <button type="button" onClick={this.toggle}>Close</button>
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    );
  }
}

Endpoint.propTypes = {
  method: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  pathParams: PropTypes.object,
  queryParams: PropTypes.object,
  children: PropTypes.node.isRequired,
};

Endpoint.defaultProps = {
  pathParams: {},
  queryParams: {},
};

export default Endpoint;
