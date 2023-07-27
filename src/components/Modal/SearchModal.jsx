import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "antd/es/transfer/search";
import React from "react";
import { Drawer } from "antd";
import { useDispatch } from "react-redux";
import { closeModalSearch } from "../../slices/modalSlice";
import { useSelector } from "react-redux";

export default function SearchModal() {
  const onSearch = (value) => console.log(value);
  const { showModalSearch } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  return (
    <>
      <Drawer
        placement="left"
        closable={true}
        title="Search issues"
        open={showModalSearch}
        onClose={() => dispatch(closeModalSearch())}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl modal-search">
          {/*content*/}
          <div>
            {/*header*/}
            <div className="search-block ">
              <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
                classNames="w-full"
              />
            </div>
            {/*body*/}
            <div className="modal-body relative py-5 flex-auto">
              <p className="font-medium text-lg">Recent Issues</p>
              <div className="flex items-center">
                <div className="icon">
                  <FontAwesomeIcon icon={faBookmark} />
                </div>
                <div>
                  <p>cyberlearn</p>
                  <p>BUG-238066</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}
