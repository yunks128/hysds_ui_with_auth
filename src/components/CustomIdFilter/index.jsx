import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux"; // redux
import { editCustomFilterId } from "../../redux/actions";
import { ReactiveComponent } from "@appbaseio/reactivesearch"; // reactivesearch

let Handler = class extends React.Component {
  constructor(props) {
    super(props);
    const { componentId } = props;
    this.state = {
      [componentId]: props[componentId]
    };
  }

  componentDidMount() {
    const { value, dataField } = this.props;

    if (value) {
      const query = this._generateQuery(dataField, value);
      this.props.setQuery({
        query,
        value
      });
    }
  }

  _generateQuery = (dataField, value) => ({
    query: {
      term: {
        [dataField]: value
      }
    }
  });

  _sendEmptyQuery = () => {
    this.props.setQuery({ query: null, value: null });
    this.setState({ value: null });
  };

  componentDidUpdate() {
    const { dataField, componentId } = this.props;

    if (this.props[componentId] !== this.state[componentId]) {
      if (!this.state[componentId]) {
        const query = this._generateQuery(dataField, this.props[componentId]);
        this.props.setQuery({
          query,
          value: this.props[componentId]
        });
        this.setState({
          [componentId]: this.props[componentId]
        });
      } else {
        this._sendEmptyQuery(); // clearing _id facet
      }
    } else if (this.props[componentId] !== this.props.value) {
      // this is to handle page forwards and backwards
      if (this.props.value) {
        const query = this._generateQuery(dataField, this.props.value);
        this.props.setQuery({
          query,
          value: this.props.value
        });
      } else {
        this._sendEmptyQuery();
      }
      this.props.editCustomFilterId(componentId, this.props.value);
      this.setState({
        [componentId]: this.props.value
      });
    }
  }

  render = () => <Fragment />;
};

// Redux states and actions
const mapStateToProps = (state, ownProps) => {
  const { componentId } = ownProps;
  return {
    [componentId]: state.reactivesearchReducer[componentId]
  };
};

const mapDispatchToProps = dispatch => ({
  editCustomFilterId: (componentId, value) =>
    dispatch(editCustomFilterId(componentId, value))
});

Handler = connect(mapStateToProps, mapDispatchToProps)(Handler);

const CustomIdFilter = ({ componentId, dataField }) => {
  return (
    <ReactiveComponent
      componentId={componentId}
      URLParams={true}
      render={({ setQuery, value }) => (
        <Handler
          setQuery={setQuery}
          value={value}
          componentId={componentId}
          dataField={dataField}
        />
      )}
    />
  );
};

CustomIdFilter.propTypes = {
  componentId: PropTypes.string.isRequired,
  dataField: PropTypes.string.isRequired
};

export default CustomIdFilter;