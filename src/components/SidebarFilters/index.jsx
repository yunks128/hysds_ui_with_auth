import React from "react";
import PropTypes from "prop-types";

import { SingleList, DateRange,  } from "@appbaseio/reactivesearch";

import "./style.css";

function Filter({
  componentId,
  dataField,
  title,
  type,
  sortBy,
  defaultValue,
  size,
  queryLogic,
}) {
  switch (type) {
    case "multi":
      return (
        <MultiList
          componentId={componentId}
          key={componentId}
          dataField={dataField}
          title={title}
          URLParams={true}
          sortBy={sortBy}
          size={size}
          defaultValue={defaultValue}
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
          className="reactivesearch-input reactivesearch-date"
        />
      );
    case "single":
    default:
      return (
        <multiList
          componentId={componentId}
          key={componentId}
          dataField={dataField}
          title={title}
          URLParams={true}
          sortBy={sortBy}
          size={size}
          defaultValue={defaultValue}
          react={queryLogic}
          className="reactivesearch-input"
        />
      );
  }
}

Filter.defaultProps = {
  size: 1000,
  defaultValue: null,
};

function SidebarFilters({ filters, queryLogic }) {
  return filters.map((filter) => (
    <Filter key={filter.componentId} queryLogic={queryLogic} {...filter} />
  ));
}

SidebarFilters.propTypes = {
  filters: PropTypes.array.isRequired,
};

SidebarFilters.defaultProps = {
  filters: [],
  queryLogic: null,
};

export default SidebarFilters;
