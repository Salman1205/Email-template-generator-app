import { useState } from 'react'
import SlidingPanel from 'react-sliding-side-panel';

const SideBar = () => {
    const [openPanel, setOpenPanel] = useState(false);
    return (
      <div>
        <div>
          <button onClick={() => setOpenPanel(true)}>Open</button>
        </div>
        <SlidingPanel
          type={'left'}
          isOpen={openPanel}
          size={30}
        >
          <div>
            <div>My Panel Content</div>
            <button onClick={() => setOpenPanel(false)}>close</button>
          </div>
        </SlidingPanel>
      </div>
    );
}

export default SideBar
