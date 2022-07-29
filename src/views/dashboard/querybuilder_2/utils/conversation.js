import { Draggable } from "leaflet";

// MAKE IT UTIL FUNCTION
const camelizeText = (text) => {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
};
// MAKE IT UTIL FUNCTION

export const convertToQueryBuilderFormat = (data = []) => {
  let queryBuilderObject = { fields: {} };
  if (data.id) {
    if (data.metadata?.length > 0) {
      data.metadata.map((field) => {
        switch (field.factType) {
          case "string":
            console.log("queryBuilderObject",queryBuilderObject)
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "text",
                fieldSettings: {
                  min: parseInt(field.factMinValue),
                  max: parseInt(field.factMaxValue),
                },
                valueSources: ["value", "field", "func"],
              };
            break;
          case "number":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "number",
                fieldSettings: {
                  min: parseInt(field.factMinValue),
                  max: parseInt(field.factMaxValue),
                },
                valueSources: ["value", "field", "func"],
                preferWidgets: field.isNumberSlider
                  ? ["slider", "rangeslider"]
                  : ["number"],
              };
            break;
          case "array":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "select",
                fieldSettings: {
                  listValues: field.factArrayList?.map((item) => ({
                    value: item.factArrayValue,
                    title: item.factArrayName,
                  })),
                },
                valueSources: ["value", "field"],
              };
            break;
          case "switch":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "select",
                fieldSettings: {
                  listValues: field.factArrayList?.map((item) => ({
                    value: item.factArrayValue,
                    title: item.factArrayName,
                  })),
                },
                valueSources: ["value", "field"],
              };
            break;
          case "multiswitch":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "multiselect",
                fieldSettings: {
                  listValues: field.factArrayList?.map((item) => ({
                    value: item.factArrayValue,
                    title: item.factArrayName,
                  })),
                },
                valueSources: ["value", "field"],
                allowCustomValues: true,
              };
            break;
          case "boolean":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "boolean",
              };
            break;
          case "date":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "date",
                valueSources: ["value", "field"],
              };
            break;
          case "time":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "time",
                valueSources: ["value", "field"],
                operators: ["greater_or_equal", "less_or_equal", "between"],
              };
            break;
          case "dateTime":
            queryBuilderObject.fields[camelizeText(`${field.factDefination}`)] =
              {
                label: `${field.factDefination}`,
                type: "datetime",
                valueSources: ["value", "field"],
              };
            break;
          default:
            break;
        }
      });
    }
  }
  return queryBuilderObject.fields;
};
