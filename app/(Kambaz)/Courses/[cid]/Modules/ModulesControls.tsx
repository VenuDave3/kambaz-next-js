'use client';
import { useState } from 'react'; // 1. Import useState
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';
import GreenCheckmark from './GreenCheckmark';
import ModuleEditor from './ModuleEditor'; // 2. Import the new ModuleEditor

// 3. Define the new props we need to accept from page.tsx
export default function ModulesControls({ moduleName, setModuleName, addModule }: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {

  // 4. Add the state to show/hide the modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap clearfix mb-3"> {/* Added mb-3 for spacing */}
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={handleShow} // 5. Changed this to open the modal
      >
        <FaPlus className="position-relative me-2" style={{ bottom: '1px' }} />
        Module
      </Button>

      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          {/* ... other dropdown items ... */}
          <DropdownItem id="wd-unpublish-modules-only">
            Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* View Progress & Collapse All */}
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      {/* 6. Add the ModuleEditor, linked to our state */}
      <ModuleEditor 
        show={show} 
        handleClose={handleClose} 
        dialogTitle="Add Module"
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={addModule} 
      />
    </div>
  );
}