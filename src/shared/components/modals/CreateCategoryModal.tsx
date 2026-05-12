"use client";
import React, { useState } from "react";
import { Modal, Field, PATHS } from "./heelpers/ModalHelpers";

export default function CreateCategoryModal({ isOpen, onClose, onSubmit, isPending }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  return (
    <Modal
      title="New Category"
      icon={PATHS.plus} iconClass="text-blue-600" iconBgClass="bg-blue-50"
      confirmLabel={isPending ? "Creating..." : "Create"} confirmClass="bg-blue-600"
      onConfirm={() => onSubmit({ name, description })}
      onCancel={onClose} disabled={isPending}
    >
      <div className="flex flex-col gap-3">
        <Field label="Name" value={name} onChange={setName} disabled={isPending} />
        <Field label="Description" value={description} onChange={setDescription} multiline disabled={isPending} />
      </div>
    </Modal>
  );
}