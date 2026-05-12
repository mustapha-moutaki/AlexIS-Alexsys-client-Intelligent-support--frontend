"use client";

import React from "react";
import { Category } from "@/src/types/Category";
import { Modal, PATHS } from "./heelpers/ModalHelpers";

interface Props {
  category: Category | null;
  onClose: () => void;
  onConfirm: (id: number) => void;
}

export default function DeleteCategoryModal({ category, onClose, onConfirm }: Props) {
  if (!category) return null;

  return (
    <Modal
      title="Delete Category"
      icon={PATHS.trash}
      iconClass="text-red-500"
      iconBgClass="bg-red-50"
      confirmLabel="Delete"
      confirmClass="bg-red-600"
      onConfirm={() => onConfirm(category.id)}
      onCancel={onClose}
    >
      <p className="text-sm text-gray-500 leading-relaxed">
        Are you sure you want to delete <span className="font-bold text-gray-700">{category.name}</span>? This action cannot be undone.
      </p>
    </Modal>
  );
}