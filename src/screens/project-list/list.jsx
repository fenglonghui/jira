/*
 * @Author: flh
 * @Date: 2022-03-30 17:16:22
 * @LastEditTime: 2022-03-30 20:57:40
 * @LastEditors: Please set LastEditors
 * @Description: 查询列表
 * @FilePath: /jira/src/screens/project-list/list.jsx
 */
import React from "react";

export const List = ({ users, list }) => {
    return <table>
        <thead>
            <tr>
                <th>项目名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{users?.find(user => user.id === project.personId)?.name}</td>
                </tr>)
            }
        </tbody>
    </table>
}
