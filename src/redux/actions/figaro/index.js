import {
  EDIT_DATA_COUNT,
  GET_JOB_LIST,
  LOAD_JOB_PARAMS,
  LOAD_QUEUE_LIST,
  LOAD_QUEUE,
  LOAD_USER_RULES,
  LOAD_USER_RULE,
  TOGGLE_USER_RULE,
  USER_RULE_ACTION_LOADING,
  DELETE_USER_RULE,
  JOB_COUNTS,
  LOAD_USER_RULES_TAGS,
  LOAD_TIME_LIMITS,
  LOAD_DISK_USAGE,
} from "../../constants.js";

import { editUrlDataCount } from "../../../utils";

import {
  MOZART_ES_URL,
  MOZART_ES_INDICES,
  MOZART_REST_API_BASE,
  MOZART_REST_API_V1,
  MOZART_REST_API_V2,
} from "../../../config";
import {getAccessToken} from "../../../AppWithAuthentication";

export const getJobCounts = () => (dispatch) => {
    const jobCountsEndpoint = `${MOZART_REST_API_BASE}/job_count`;

    return fetch(jobCountsEndpoint, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
        method: "GET"
    })
        .then((res) => res.json())
        .then((data) =>
            dispatch({
                type: JOB_COUNTS,
                payload: data.counts,
            })
        );
};

export const getOnDemandJobs = () => (dispatch) => {
  const getJobsEndpoint = `${MOZART_REST_API_V1}/on-demand`;

  return fetch(getJobsEndpoint, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
      method: "GET"
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: GET_JOB_LIST,
        payload: data.result,
      })
    );
};

export const getQueueList = (jobSpec) => (dispatch) => {
  const queuesEndpoint = `${MOZART_REST_API_V2}/queue/list?id=${jobSpec}`;

  return fetch(queuesEndpoint, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
      method: "GET"
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: LOAD_QUEUE_LIST,
        payload: data.result.queues,
      });
      dispatch({
        type: LOAD_QUEUE,
        payload: data.result.recommended,
      });
    });
};

// /job-params
export const getParamsList = (jobSpec) => (dispatch) => {
  const paramsListEndpoint = `${MOZART_REST_API_V1}/on-demand/job-params?job_type=${jobSpec}`;

  return fetch(paramsListEndpoint, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
      method: "GET"
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: LOAD_JOB_PARAMS,
        payload: data,
      });
      dispatch({
        type: LOAD_TIME_LIMITS,
        payload: {
          timeLimit: data.time_limit,
          softTimeLimit: data.soft_time_limit,
        },
      });
      dispatch({
        type: LOAD_DISK_USAGE,
        payload: data.disk_usage,
      });
    });
};

export const editDataCount = (query) => (dispatch) => {
  const ES_QUERY_DATA_COUNT_ENDPOINT = `${MOZART_ES_URL}/${MOZART_ES_INDICES}/_count`;

  try {
    let parsedQuery = { query: JSON.parse(query) };

    fetch(ES_QUERY_DATA_COUNT_ENDPOINT, {
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + getAccessToken() },
        method: "POST",
        body: JSON.stringify(parsedQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          editUrlDataCount(null);
          dispatch({ type: EDIT_DATA_COUNT, payload: null });
        } else {
          editUrlDataCount(data.count);
          dispatch({ type: EDIT_DATA_COUNT, payload: data.count });
        }
      });
  } catch (err) {
    editUrlDataCount(null);
    dispatch({ type: EDIT_DATA_COUNT, payload: null });
  }
};

// TOSCA USER RULES ACTIONS
export const getUserRules = () => (dispatch) => {
  const getUserRulesEndpoint = `${MOZART_REST_API_V1}/user-rules`;

  return fetch(getUserRulesEndpoint, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
      method: "GET"
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: LOAD_USER_RULES,
        payload: data.rules,
      })
    );
};

export const getUserRule = (id) => (dispatch) => {
  const userRuleEndpoint = `${MOZART_REST_API_V1}/user-rules?id=${id}`;

  return fetch(userRuleEndpoint, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
      method: "GET"
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: LOAD_USER_RULE,
        payload: data.rule,
      });
      dispatch({
        type: LOAD_TIME_LIMITS,
        payload: {
          timeLimit: data.rule.time_limit,
          softTimeLimit: data.rule.soft_time_limit,
        },
      });
      dispatch({
        type: LOAD_DISK_USAGE,
        payload: data.rule.disk_usage,
      });

      const jobSpec = data.rule.job_spec;

      const queuesEndpoint = `${MOZART_REST_API_V2}/queue/list?id=${jobSpec}`;

      fetch(queuesEndpoint, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
          method: "GET"
      }) // fetching the queue list for this job
        .then((res) => res.json())
        .then((data) =>
          dispatch({
            type: LOAD_QUEUE_LIST,
            payload: data.result.queues,
          })
        )
        .catch((err) => console.error(err));

      const paramsListEndpoint = `${MOZART_REST_API_V1}/on-demand/job-params?job_type=${jobSpec}`;
      fetch(paramsListEndpoint, {
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
          method: "GET"
      })
        .then((res) => res.json())
        .then((data) => {
          delete data.enable_dedup;
          dispatch({
            type: LOAD_JOB_PARAMS,
            payload: data,
          });
        });
    });
};

export const getUserRulesTags = () => (dispatch) => {
  const endpoint = `${MOZART_REST_API_V1}/user-rules-tags`;

  fetch(endpoint, {
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getAccessToken() },
      method: "GET"
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: LOAD_USER_RULES_TAGS,
        payload: data.tags,
      })
    );
};

export const toggleUserRule = (index, id, enabled) => (dispatch) => {
  dispatch({
    type: USER_RULE_ACTION_LOADING,
    payload: { index, id },
  });

  const toggleUserRuleEndpoint = `${MOZART_REST_API_V1}/user-rules`;
  const payload = {
    id: id,
    enabled,
  };

  return fetch(toggleUserRuleEndpoint, {
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + getAccessToken() },
      method: "PUT",
      body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: TOGGLE_USER_RULE,
        payload: { ...data, index, id },
      });
    });
};

export const deleteUserRule = (index, id) => (dispatch) => {
  const deleteRuleEndpoint = `${MOZART_REST_API_V1}/user-rules?id=${id}`;

  return fetch(deleteRuleEndpoint, {
      headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + getAccessToken() },
      method: "DELETE"
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: DELETE_USER_RULE,
        payload: { index, id },
      })
    );
};
