"use client";
import React, { useState, useEffect } from "react";
import { Modal, Field, PATHS } from "./heelpers/ModalHelpers";
import { Category } from "@/src/types/Category";

export default function EditCategoryModal({ isOpen, onClose, onSubmit, isPending, category }: any) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Sync state with the category being edited
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description || "");
    }
  }, [category]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    // Send the updated data plus the original ID
    onSubmit({ id: category.id, name, description });
  };

  return (
    <Modal
      title="Edit Category"
      icon={PATHS.edit} iconClass="text-blue-600" iconBgClass="bg-blue-50"
      confirmLabel={isPending ? "Saving..." : "Save Changes"} confirmClass="bg-blue-600"
      onConfirm={handleConfirm}
      onCancel={onClose} disabled={isPending}
    >
      <div className="flex flex-col gap-3">
        <Field label="Name" value={name} onChange={setName} disabled={isPending} />
        <Field label="Description" value={description} onChange={setDescription} multiline disabled={isPending} />
      </div>
    </Modal>
  );
}