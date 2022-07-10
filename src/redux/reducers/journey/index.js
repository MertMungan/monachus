import Trigger from "../../../views/pages/actions/doc/EngDndGraphDoc/Trigger";
import EngIcon from "../../../views/pages/actions/components/EngIcon";
import styled from "styled-components";

const EngBorderedBox = styled.div`
  width: ${(props) => props.width || "42"}px;
  height: ${(props) => props.height || "42"}px;
  border: ${(props) => props.border || "1px dashed #B3BAC5"};
  border-radius: ${(props) => (props.width ? "21px" : "16px")};
  background-color: ${(props) => props.backgroundColor || "#FAFBFC"};
`;

const Label = styled.div`
  font-size: ${(props) => props.fontSize || "16px"};
  font-weight: ${(props) => props.fontWeight || "normal"};
  color: ${(props) => props.color || "#cd5c5c"};
  line-height: ${(props) => props.lineHeight || "normal"};
  margin: ${(props) => props.margin || "4px 2px"};
`;

const initialState = [
  {
    id: "1",
    component: Trigger,
    props: {
      triggerContent: (
        <h6 className="eng-trigger-content">
          Start journey by defining any criteria
        </h6>
      ),
    },
    to: ["2"],
    width: 148,
    height: 180,
    type: "ENTRY_TRIGGER",
  },
  {
    id: "emptyGraphText",
    component: Label,
    props: {
      children: "Drag and drop building blocks to complete the journey",
      color: "#B3BAC5",
    },
    showEdge: false,
    width: 180,
    height: 40,
    type: "EMPTY_GRAPH_TEXT",
  },
  {
    from: "1",
    id: "2",
    component: EngBorderedBox,
    to: ["3"],
    type: "PLACEHOLDER_NODE",
    width: 48,
    height: 48,
  },
  {
    from: "2",
    id: "3",
    component: EngBorderedBox,
    to: ["4", "5"],
    type: "PLACEHOLDER_NODE",
    width: 48,
    height: 48,
  },
  {
    from: "3",
    id: "4",
    component: EngBorderedBox,
    to: ["6"],
    type: "PLACEHOLDER_NODE",
    width: 48,
    height: 48,
  },
  {
    from: "3",
    id: "5",
    component: EngBorderedBox,
    to: ["7"],
    type: "PLACEHOLDER_NODE",
    width: 48,
    height: 48,
  },
  {
    from: "4",
    id: "6",
    component: EngIcon,
    props: {
      type: "CloseCircleOutlined",
      style: {
        color: "#cd5c5c",
        fontSize: "38px",
      },
    },
    type: "END_NODE",
    width: 48,
    height: 48,
  },
  {
    from: "6",
    id: "7",
    component: EngIcon,
    props: {
      type: "CloseCircleOutlined",
      style: {
        color: "#cd5c5c",
        fontSize: "38px",
      },
    },
    type: "END_NODE",
    width: 48,
    height: 48,
  },
];

/* 
SAVE SONRASI INITIAL STATE'İN TRIGGER'I AYNI KALIYOR

ENDNODE NODE'UNDA İSE HEIGHT WIDTH KAYBOLUYOR VE PROPS OBJESİNİN İÇİNE İD PROPU EKLENİYOR

PLACEHOLDER NODE'U DİREKT KAYBOLUYOR VE ONUN YERİNE GELEN NODE'UN PLACEHOLDER NODE'UNDAN FARKI
HEIGHT,ID WIDTH PROPERTYLERİNİN OLMAMASI VE TYPE PROPERTYSİNİN FARKLI OLMASI

INITIAL STATE'TE EMPTY GRAP TEXT ADLI BİR NODE VAR. BU NODE DA YOK OLUYOR.

*/
const journeyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_JOURNEY_DATA":
      return action.payload;
    case "ADD_JOURNEY_DATA":
      return action.payload;
    case "UPDATE_JOURNEY_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default journeyReducer;
