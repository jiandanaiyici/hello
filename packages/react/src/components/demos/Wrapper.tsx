import React from 'react';

const Wrapper = (props) => {
  return (
    <div className="row">
      {React.Children.map(props.children, (child) => (
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{child.props.title}</h5>
              {React.cloneElement(child)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wrapper;
