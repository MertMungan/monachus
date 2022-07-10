import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from "reactstrap";
import Select from "react-select";
import { selectThemeColors } from "@utils";

export default function CollectionTopBar({
  handleSelectedCollection = () => {},
  collectionList = [],
  handleAddCollection = () => {},
  showAddCollection = true,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [formModal, setFormModal] = useState(false);
  const [collectionCompSet, setCollectionCompSet] = useState("");

  // MODAL AÇMA
  const handleModalOpen = () => {
    setFormModal(true);
  };
  // MODAL KAPAMA
  const handleModalClose = () => {
    setFormModal(false);
  };

  const handleCollectionNameSet = () => {
    handleAddCollection(collectionCompSet);
    setCollectionCompSet("");
    setFormModal(false);
  };

  return (
    <>
      <div class="row">
        <div class="col-sm-3">
          <Select
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            defaultValue={collectionList[0]}
            options={collectionList}
            isClearable={true}
            onChange={handleSelectedCollection}
          />
        </div>
        {showAddCollection && (
          <div class="col-sm-3">
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={() => handleModalOpen()}
              color="primary"
              className="w-100"
            >
              Add Collections
            </Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={formModal}
        toggle={() => handleModalClose()}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={() => handleModalClose()}></ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input
              type="text"
              placeholder="Press enter after you finish typing collection name"
              //CONTORLLEd INPPUT
              value={collectionCompSet}
              onChange={(e) => setCollectionCompSet(e.target.value)}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleCollectionNameSet}>
            Click to Submit Collection
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
