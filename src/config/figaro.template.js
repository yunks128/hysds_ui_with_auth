exports.FIGARO_DISPLAY_COLUMNS = [
  { Header: "status", accessor: "status" },
  { Header: "job name", accessor: "job.name" },
  { Header: "job type", accessor: "job.type" },
  { Header: "queue", accessor: "job.job_info.job_queue" },
  { Header: "node", accessor: "job.job_info.execute_node" },
  { Header: "timestamp", accessor: "@timestamp" },
  { Header: "duration", accessor: "job.job_info.duration" },
];

exports.FILTERS = [
  {
    componentId: "resource",
    dataField: "resource",
    title: "Resource",
    type: "multi",
    defaultValue: ["job"],
  },
  {
    componentId: "status",
    dataField: "status",
    title: "Status",
    type: "single",
    sortBy: "asc",
    defaultValue: [
      "job-completed",
      "job-failed",
      "job-queued",
      "job-started"
    ]
  },
  {
    componentId: "tags",
    dataField: "tags.keyword",
    title: "Tags",
    type: "multi",
    size: 1000,
  },
  {
    componentId: "timestamp",
    dataField: "@timestamp",
    title: "Timestamp",
    type: "date",
  },
  {
    componentId: "job_type",
    dataField: "job.type",
    title: "Job Type",
    type: "multi",
    size: 1000,
  },
  {
    componentId: "queue",
    dataField: "job.job_info.job_queue",
    title: "Job Queue",
    type: "multi",
  },
  {
    componentId: "username",
    dataField: "job.username",
    title: "Username",
    type: "multi",
  },
  {
    componentId: "node",
    dataField: "job.job_info.execute_node",
    title: "Node",
    type: "multi",
    size: 1000,
  },
  {
    componentId: "priority",
    dataField: "job.priority",
    title: "Priority",
    type: "multi",
    sortBy: "desc",
  },
  {
    componentId: "short_error",
    dataField: "short_error.keyword",
    title: "Short Error",
    type: "multi",
    size: 1000,
  },
  {
    componentId: "job_detail",
    dataField: "msg",
    title: "Job Detail",
    type: "multi",
  },
  {
    componentId: "container_image",
    dataField: "job.container_image_name",
    title: "Container Image",
    type: "multi",
  },
  {
    componentId: "instance_type",
    dataField: "job.job_info.facts.ec2_instance_type",
    title: "Instance Type",
    type: "multi",
  },
  {
    componentId: "retry_count",
    dataField: "job.retry_count",
    title: "Retry Count",
    type: "multi",
  },
];

exports.SORT_OPTIONS = ["@timestamp"];

// TODO: TRY ADDING .KEYWORD TO COMPONENTID
exports.QUERY_LOGIC = {
  and: [
    "_id",
    "tags",
    "status",
    "short_error",
    "job_detail",
    "resource",
    "job_type",
    "queue",
    "username",
    "node",
    "priority",
    "container_image",
    "instance_type",
    "retry_count",
    "query_string",
    "payload_id",
    "timestamp",
  ],
};

exports.FIELDS = [
  "_index",
  "_id",
  "status",
  "resource",
  "payload_id",
  "@timestamp",
  "short_error",
  "error",
  "traceback",
  "msg_details",
  "tags",
  "job.name",
  "job.priority",
  "job.retry_count",
  "job.type",
  "job.job_info.execute_node",
  "job.job_info.facts.ec2_instance_type",
  "job.job_info.job_queue",
  "job.job_info.duration",
  "job.job_info.job_url",
  "job.job_info.time_queued",
  "job.job_info.time_start",
  "job.job_info.time_end",
  "job.job_info.metrics.products_staged.id",
  "event.traceback",
  "user_tags",
  "dedup_job",
];
