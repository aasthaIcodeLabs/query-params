import React from "react";

const List = ({users}) => {
  return (
    <div className="w-full flex flex-col p-3 gap-4 border-l-2 border-yellow-500 min-h-[80vh]">
      <h2 className="font-bold text-yellow-500 text-4xl">Users List</h2>

      <div className="flex flex-col gap-4 w-full">
        {users.length > 0 && users.map((user,index ) => {
          return (
            <div className="w-full"   key={index} >
              <div className="bg-green-800 w-full h-32 shadow-md cursor-pointer shadow-yellow-200  p-3 rounded-md  flex flex-col gap-2" >
                <div className="flex gap-2" >
                  <h3> Name : </h3>
                  {user.firstName}
                </div>
                <div className="flex gap-2">
                  <h3>Gender :</h3>

                  {user.gender}
                </div>
                <div className="flex gap-2">
                  <h3>Location :</h3>

                 {user.address.city}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
