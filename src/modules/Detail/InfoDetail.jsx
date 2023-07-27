import Search from "antd/es/transfer/search";
import React from "react";

export default function InfoDetail({ members }) {
  const onSearch = (value) => console.log(value);
  return (
    <>
      <div>
        <div className="info flex">
          <div className="search-block">
            <Search
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>
          <div className="avatar-group flex">
            {members?.map((user) => {
              return (
                <div key={user.userId} className="avatar">
                  <img src={user.avatar} alt={user.avatar} />
                </div>
              );
            })}
          </div>
          <div style={{ marginLeft: 20 }} className="text">
            Only My Issues
          </div>
          <div style={{ marginLeft: 20 }} className="text">
            Recently Updated
          </div>
        </div>
      </div>
    </>
  );
}
