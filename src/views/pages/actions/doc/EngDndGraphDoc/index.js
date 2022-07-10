import React, { useState, useMemo, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import { Label } from "../../components/Label";
import EngIcon from "../../components/EngIcon";
import EngDnDGraph from "../../components/EngDnDGraph";
import Trigger from "./Trigger";
import cloneDeep from "lodash/cloneDeep";
import { COLORS } from "../../components/Constants/StyleVar";
import { ICON_TYPES } from "../../components/Constants";
import "./index.scss";
import SlideDrawer from "../../components/SlideDrawer";
import SlideMonachusEmail from "../../components/SlideMonachusEmail";
import SlideMonachusPushNotification from "../../components/SlideMonachusPushNotification";
import SlideMonachusDecisionSplit from "../../components/SlideMonachusDecisionSplit";
import SlideMonachusWait from "../../components/SlideMonachusWait";
import SlideMonachusWaitDuration from "../../components/SlideMonachusWaitDuration";
import Backdrop from "../../components/Backdrop";
import { useSkin } from "@hooks/useSkin";
let currentSkin = "dark";
const EngBorderedBox = styled.div`
  width: ${(props) => props.width || "42"}px;
  height: ${(props) => props.height || "42"}px;
  border: ${(props) => props.border || "1px dashed #B3BAC5"};
  border-radius: ${(props) => (props.width ? "21px" : "16px")};
  background-color: ${(props) => props.backgroundColor || "#FAFBFC"};
`;

const sidebarNodes = [
  {
    key: "engagements",
    title: "Engagements",
    children: [
      {
        id: "pushNotification",
        type: ICON_TYPES.SMS,
        label: "Push",
      },

      {
        id: "email",
        type: ICON_TYPES.EMAIL,
        label: "Email",
      },
      /* {
        id: "mpush",
        type: ICON_TYPES.PUSH,
        label: "M-Push",
      },
      {
        id: "whatsapp",
        type: ICON_TYPES.WHATSAPP,
        label: "Whatsapp",
      },
      {
        id: "fb",
        type: ICON_TYPES.FB,
        label: "Facebook",
      },
      {
        id: "instagram",
        type: ICON_TYPES.INSTAGRAM,
        label: "Instagram",
      }, */
    ],
    color: COLORS.YELLOW,
  },
  {
    key: "flowControl",
    title: "Flow Control",
    children: [
      {
        id: "wait",
        type: ICON_TYPES.WAIT,
        label: "Wait date",
      },
      {
        id: "waitDuration",
        type: ICON_TYPES.WAIT_DURATION,
        label: "Wait duration",
      },
      {
        id: "decision_split",
        type: ICON_TYPES.DECISION_SPLIT,
        label: "Decision split",
        isMultiPath: true,
      },
    ],
    color: COLORS.BLUE,
  },
];

const entryTrigger = {
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
};

const endIconProps = {
  type: ICON_TYPES.END,
  style: {
    color: COLORS.DARK_RED,
    fontSize: "38px",
  },
};

export const initialGraphData = [
  entryTrigger,
  {
    id: "emptyGraphText",
    component: Label,
    props: {
      children: "Drag and drop building blocks to complete the journey",
      color: COLORS.LIGHT_GREY,
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
    props: endIconProps,
    type: "END_NODE",
    width: 48,
    height: 48,
  },
  {
    from: "6",
    id: "7",
    component: EngIcon,
    props: endIconProps,
    type: "END_NODE",
    width: 48,
    height: 48,
  },
];

const props = {
  sidebarProps: {
    sidebarTitle: "Building blocks",
    sidebarDescription: "Drag & drop blocks to create the journey",
    nodes: sidebarNodes,
  },
  initialGraphData,
  dndGraphId: "journey-graph-container",
};

function EngDndGraphDoc() {
  /**The graphNodes state will hold info about the Graph*/
  const [graphNodes, setGraphNodes] = useState(initialGraphData);
  const [skin, setSkin] = useSkin();
  const [selectedJourneyOptionId, setSelectedJourneyOptionId] = useState("");
  currentSkin = skin;
  /**The journeyBlockDetails will hold configuration info about blocks in graphNodes */
  const [journeyBlockDetails, setJourneyBlockDetails] = useState({});

  /**If settings icon clicked, set showConfigScreen to true */
  const [showConfigScreen, setShowConfigScreen] = useState(false);

  /**Set selectedBlockId for node on which settings icon is clicked. */
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  /**On click of configure :
   * 1) set SelectedBlockId with the block being clicked
   * 2) show configScreen (show Custom Component inside Drawer or Modal)*/
  const [slideDrawerContent, setSlideDrawerContent] = useState(
    <div style={{ marginTop: "30rem" }}>Init</div>
  );
  const onClickConfigure = (blockId) => {
    setSelectedBlockId(blockId);
    setShowConfigScreen(true);
  };

  const list = {
    email: {
      component: (
        <SlideMonachusEmail
          selectedBlockId={selectedBlockId}
          selectedBlockType="email"
          graphNodes={graphNodes}
          selectedJourneyOptionId={selectedJourneyOptionId}
        />
      ),
    },
    pushNotification: {
      component: (
        <SlideMonachusPushNotification
          selectedBlockId={selectedBlockId}
          selectedBlockType="sms"
          graphNodes={graphNodes}
          selectedJourneyOptionId={selectedJourneyOptionId}
        />
      ),
    },
    decision_split: {
      component: (
        <SlideMonachusDecisionSplit
          selectedBlockId={selectedBlockId}
          selectedBlockType="decision_split"
          graphNodes={graphNodes}
          selectedJourneyOptionId={selectedJourneyOptionId}
        />
      ),
    },
    wait: {
      component: (
        <SlideMonachusWait
          selectedBlockId={selectedBlockId}
          selectedBlockType="wait"
          graphNodes={graphNodes}
          selectedJourneyOptionId={selectedJourneyOptionId}
        />
      ),
    },
    waitDuration: {
      component: (
        <SlideMonachusWaitDuration
          selectedBlockId={selectedBlockId}
          selectedBlockType="waitDuration"
          graphNodes={graphNodes}
          selectedJourneyOptionId={selectedJourneyOptionId}
        />
      ),
    },
  };

  const [listOfComponentTypes, setListOfComponentTypes] = useState(list);

  const findAndUpdateComponent = (targetComponent, blockId, journeyId) => {
    const list = {
      email: {
        component: (
          <SlideMonachusEmail
            selectedBlockId={blockId}
            selectedBlockType="email"
            graphNodes={graphNodes}
            selectedJourneyOptionId={journeyId}
          />
        ),
      },
      pushNotification: {
        component: (
          <SlideMonachusPushNotification
            selectedBlockId={blockId}
            selectedBlockType="sms"
            graphNodes={graphNodes}
            selectedJourneyOptionId={journeyId}
          />
        ),
      },
      decision_split: {
        component: (
          <SlideMonachusDecisionSplit
            selectedBlockId={blockId}
            selectedBlockType="decision_split"
            graphNodes={graphNodes}
            selectedJourneyOptionId={journeyId}
          />
        ),
      },
      wait: {
        component: (
          <SlideMonachusWait
            selectedBlockId={blockId}
            selectedBlockType="wait"
            graphNodes={graphNodes}
            selectedJourneyOptionId={journeyId}
          />
        ),
      },
      waitDuration: {
        component: (
          <SlideMonachusWaitDuration
            selectedBlockId={blockId}
            selectedBlockType="waitDuration"
            graphNodes={graphNodes}
            selectedJourneyOptionId={journeyId}
          />
        ),
      },
    };

    setListOfComponentTypes({ ...list });
  };

  useEffect(() => {
    const bType = graphNodes.find((node) => node.id === selectedBlockId)?.props
      ?.blockType;
    setSlideDrawerContent(listOfComponentTypes[bType]?.component);
  }, [listOfComponentTypes]);

  useEffect(() => {
    const bType = graphNodes.find((node) => node.id === selectedBlockId)?.props
      ?.blockType;
    if (bType) {
      findAndUpdateComponent(
        list[bType].component,
        selectedBlockId,
        selectedJourneyOptionId
      );
    }
  }, [selectedBlockId, selectedJourneyOptionId]);

  /**When new node is added :
   * add the block info in JourneyBlockDetails also.
   */
  const onDropNewNode = ({ blockId, blockType }) => {
    setJourneyBlockDetails((prevState) => {
      const clonedState = cloneDeep(prevState);
      clonedState[blockId] = {
        blockType,
      };
      return clonedState;
    });
  };
  useEffect(() => {
    // console.log("selectedJourneyOptionId", selectedJourneyOptionId);
  }, [selectedJourneyOptionId]);
  /**After configuring block info, update state in journeyBlockDetails */
  const updateJourneyBlockDetails = (blockId, blockData) => {
    setJourneyBlockDetails((prevState) => {
      const clonedState = cloneDeep(prevState);
      clonedState[blockId] = {
        ...prevState[blockId],
        ...blockData,
      };
      return clonedState;
    });
    setShowConfigScreen(false);
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <EngDnDGraph
          {...props}
          graphNodes={graphNodes}
          setGraphNodes={setGraphNodes}
          onClickConfigure={onClickConfigure}
          onDropNewNode={onDropNewNode}
          selectedJourneyOptionId={selectedJourneyOptionId}
          setselectedJourneyOptionId={setSelectedJourneyOptionId}
        />
      </DndProvider>

      <SlideDrawer show={showConfigScreen} content={slideDrawerContent} />
      {showConfigScreen && (
        <Backdrop
          closeSlider={() => updateJourneyBlockDetails(selectedBlockId, null)}
        />
      )}
    </>
  );
}
export default EngDndGraphDoc;
