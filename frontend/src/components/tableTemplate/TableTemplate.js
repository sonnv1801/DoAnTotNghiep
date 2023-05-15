import React from "react";
import "./style.css";

const TableTemplate = ({ Index, Id, Name, Dep, Day, TimeIn, TimeOut }) => {
  return (
    <div class="flex items-center justify-center w-full">
      <div class="col-span-12">
        <div class="overflow-auto lg:overflow-visible ">
          <table class="table text-gray-400 border-separate space-y-6 text-sm">
            <thead class="bg-gray-800 text-gray-500">
              <tr>
                <th class="p-3">#</th>
                <th class="p-3 text-left">ID</th>
                <th class="p-3 text-left">Tên Nhân Viên</th>
                <th class="p-3 text-left">Phòng Ban</th>
                <th class="p-3 text-left">Ngày</th>
                <th class="p-3 text-left">Thời gian vào</th>
                <th class="p-3 text-left">Thời gian ra</th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-gray-800">
                <td class="p-3">{Index}</td>
                <td class="p-3">{Id}</td>
                <td class="p-3 font-bold">{Name}</td>
                <td class="p-3 font-bold">{Dep}</td>
                <td class="p-3 font-bold">{Day}</td>
                <td class="p-3 font-bold">{TimeIn}</td>
                <td class="p-3 font-bold">{TimeOut}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableTemplate;
