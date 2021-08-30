import React from "react";
import PropTypes from "prop-types";

import { SingleList, DateRange, MultiList } from "@appbaseio/reactivesearch";

import "./style.css";

function renderFilter(filter, queryLogic) {
  const { componentId, dataField, title, type, defaultValue, sortBy } = filter;
  switch (type) {
    case "single":
      return (
        <SingleList
          componentId={componentId}
          key={componentId}
          dataField={dataField}
          title={title}
          URLParams={true}
          sortBy={sortBy}
          defaultValue={null || defaultValue}
          react={queryLogic}
          className="reactivesearch-input"
        />
      );
    case "multi":
      return (
        <MultiList
          componentId={componentId}
          key={componentId}
          dataField={dataField}
          title={title}
          URLParams={true}
          sortBy={sortBy}
          defaultValue={null || defaultValue}
          react={queryLogic}
          className="reactivesearch-input reactivesearch-multilist"
        />
      );
    case "date":
      return (
        <DateRange
          componentId={componentId}
          key={componentId}
          title={title}
          dataField={dataField}
          URLParams={true}
          sortBy={sortBy}
          className="reactivesearch-input reactivesearch-date"
        />
      );
    default:
      return (
        <SingleList
          componentId={componentId}
          key={componentId}
          dataField={dataField}
          title={title}
          URLParams={true}
          sortBy={sortBy}
          defaultValue={null || defaultValue}
          react={queryLogic}
          className="reactivesearch-input"
        />
      );
  }
}

function SidebarFilters({ filters, queryLogic }) {
  return filters.map((filter) => renderFilter(filter, queryLogic));
}

SidebarFilters.propTypes = {
  filters: PropTypes.array.isRequired,
};

SidebarFilters.defaultProps = {
  filters: [],
  queryLogic: null,
};

export default SidebarFilters;
