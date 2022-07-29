import { AbilityContext } from "@src/utility/context/Can";
import { useContext, useEffect } from "react";

const ability = useContext(AbilityContext);

export const columns = [
  {
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: "Event Name",
    selector: (row) => row.event_type,
    sortable: true,
  },
  {
    name: "Event ID",
    selector: (row) => row.event_id,
    sortable: true,
  },
  {
    name: "Rule ID",
    selector: (row) => row.rule_id,
    sortable: true,
  },
  {
    name: "Date Time",
    selector: (row) => row.alarm_datetime,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.statu,
    sortable: true,
  },
  ability.can("create", "cep") &&
    {
      name: "Actions",
      minWidth: "100px",
      cell: (row) => (
        <div className="column-action">
          <Edit
            size={15}
            onClick={() => {
              setSelectedAlert(row);
              // setEventName(
              //   eventList.find((e) => e.eventId === row.eventID).eventName
              // );
              setWizardOpen(true)
            }}
          />
        </div>
      ),
    },
]
