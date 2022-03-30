/*
 * @Author: flh
 * @Date: 2022-03-30 17:17:36
 * @LastEditTime: 2022-03-30 20:56:50
 * @LastEditors: Please set LastEditors
 * @Description: 搜索面板
 * @FilePath: /jira/src/screens/project-list/search-panel.jsx
 */
import React from "react";

export const SearchPanel = ({ users, param, setParam }) => {
    

    return <form action="">
        <div>
            <input type="text" value={param.name} onChange={ evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
            <select value={param.personId} onChange={evt => setParam({
                ...param,
                personId: evt.target.value
            })}>
                <option value="">负责人</option>
                {
                    users?.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)
                }

            </select>
        </div>
    </form>
}
