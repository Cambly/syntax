import React, {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { chain } from "react-aria";

type DisabledKeysContextValue = {
  disabledKeys: Set<string>;
  updateDisabledKey: (key: string, disabled: boolean) => void;
  selectedKeys: Set<string>;
  updateSelectedKey: (key: string, selected: boolean) => void;
};
export const DisabledKeysContext = createContext<
  DisabledKeysContextValue | undefined
>(undefined);
DisabledKeysContext.displayName = "DisabledKeysContext";

export default function DisabledKeysProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {
  const [disabledKeys, setDisabledKeys] = useState<Set<string>>(new Set());
  const updateDisabledKey = useCallback(
    (key: string, disabled: boolean) =>
      setDisabledKeys((prev) => {
        if (prev.has(key) === disabled) return prev;
        const next = new Set(prev);
        disabled ? next.add(key) : next.delete(key);
        return next;
      }),
    [],
  );

  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const updateSelectedKey = useCallback(
    (key: string, selected: boolean) =>
      setSelectedKeys((prev) => {
        if (prev.has(key) === selected) return prev;
        const next = new Set(prev);
        selected ? next.add(key) : next.delete(key);
        return next;
      }),
    [],
  );

  const richSelectContext = useMemo<DisabledKeysContextValue>(() => {
    const ctx: DisabledKeysContextValue = {
      disabledKeys,
      updateDisabledKey,
      selectedKeys,
      updateSelectedKey,
    };
    return ctx;
  }, [disabledKeys, selectedKeys, updateDisabledKey, updateSelectedKey]);
  return (
    <DisabledKeysContext.Provider value={richSelectContext}>
      {children}
    </DisabledKeysContext.Provider>
  );
}

function useDisabledKeysContext(): DisabledKeysContextValue {
  const context = useContext(DisabledKeysContext);
  if (context) return context;
  throw new Error(
    "useDisabledKeysContext must be used within a DisabledKeysProvider",
  );
}

// Parents (RichSelectBox) use this
export const useDisabledKeys = (): Set<string> => {
  const { disabledKeys } = useDisabledKeysContext();
  return disabledKeys;
};

// Attached components use this
export const useDisableKey = (key: string, disabled: boolean): void => {
  const { updateDisabledKey } = useDisabledKeysContext();
  useEffect(
    () => updateDisabledKey(key, disabled),
    [key, disabled, updateDisabledKey],
  );
};

// Parents (RichSelectBox) use this
export const useSelectedKeys = (): Set<string> => {
  const { selectedKeys } = useDisabledKeysContext();
  return selectedKeys;
};

// Attached components use this
export const useSelectKey = (key: string, selected: boolean): void => {
  const { updateSelectedKey } = useDisabledKeysContext();
  useEffect(
    () => updateSelectedKey(key, selected),
    [key, selected, updateSelectedKey],
  );
};
