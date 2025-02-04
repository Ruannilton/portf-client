"use client";

import { createProject } from "@/app/serverActions";
import { useState } from "react";

class ProjectCreation {
  name: string = "";
  brief: string = "";
  description: string = "";
  startDate: string = "";
}

export default function ProjectCreator({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(new ProjectCreation());

  const create = () => {
    createProject(userId, project).then(() => {
      setProject(new ProjectCreation());
    });
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(true)}
        className="border  border-black text-black  rounded-md py-1 px-3"
      >
        Add
      </button>
      {open && (
        <div>
          <div className="border  rounded-md my-2">
            <div className="flex flex-col">
              <label
                htmlFor="project_name"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="project_name"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your linkedin"
                name="name"
                value={project.name}
                onChange={(e) =>
                  setProject({ ...project, name: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="project_brief"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Brief
              </label>
              <input
                type="text"
                id="project_brief"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your linkedin"
                name="brief"
                value={project.brief}
                onChange={(e) =>
                  setProject({ ...project, brief: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="project_description"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                type="text"
                id="project_description"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your linkedin"
                name="description"
                value={project.description}
                onChange={(e) =>
                  setProject({ ...project, description: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="project_startDate"
                className="mb-1 text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <input
                type="date"
                id="project_startDate"
                className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500"
                name="start_date"
                value={project.startDate}
                onChange={(e) =>
                  setProject({ ...project, startDate: e.target.value })
                }
              />
            </div>

            <div className="flex flex-row gap-4 justify-end">
              <button
                onClick={() => {
                  create();
                }}
                className="border  rounded-md py-1 px-3"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setProject({
                    brief: "",
                    description: "",
                    name: "",
                    startDate: "",
                  });
                  setOpen(false);
                }}
                className="border  rounded-md py-1 px-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
