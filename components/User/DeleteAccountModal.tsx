// DeleteAccountModal.tsx
"use client";
import { sign } from "crypto";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

interface DeleteAccountModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (userId: string) => Promise<void>;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  userId,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleConfirmClick = async () => {
    setIsConfirming(true);
    await onConfirm(userId);
    await signOut({ callbackUrl: "/" });
    setIsConfirming(false);

    onClose();
  };

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50">
      <div className="z-50 mr-4 w-[320px] rounded-lg bg-white p-4 shadow-lg dark:bg-black">
        <h2 className="mb-2 text-center text-lg font-bold">
          Are you sure you want to delete your account?
        </h2>
        <div className="flex justify-between p-6 pl-10 pr-10">
          <button
            className="min-w-[80px] rounded bg-red-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-red-700 disabled:bg-red-300"
            onClick={async () => await handleConfirmClick()}
            disabled={isConfirming}
          >
            Yes
          </button>
          <button
            className="min-w-[80px] rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 transition duration-300 hover:bg-gray-500 hover:text-white"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
