export default function Flex() {
  return (
    <div id="wd-css-flex">
      <h2>Flex</h2>

      {/* 2.1.19.a – basic horizontal row */}
      <div className="wd-flex-row-container">
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red">Column 3</div>
      </div>

      {/* 2.1.19.b – last column grows */}
      <div className="wd-flex-row-container" style={{ marginTop: 12 }}>
        <div className="wd-bg-color-yellow">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
      </div>

      {/* 2.1.19.c – first column fixed width, last grows */}
      <div className="wd-flex-row-container" style={{ marginTop: 12 }}>
        <div className="wd-bg-color-yellow wd-width-75px">Column 1</div>
        <div className="wd-bg-color-blue">Column 2</div>
        <div className="wd-bg-color-red wd-flex-grow-1">Column 3</div>
      </div>
    </div>
  );
}
