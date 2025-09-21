import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DatePicker from "react-datepicker";
import type { ActivityInput } from "@/types";

interface ActivityModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ActivityInput) => void;
  isSubmitting: boolean;
  initialData?: Partial<ActivityInput>;
  mode: "add" | "edit"; // Add mode or Edit mode
}

export const ActivityModal = ({
  open,
  onClose,
  onSubmit,
  isSubmitting,
  initialData,
  mode,
}: ActivityModalProps) => {
  const [form, setForm] = useState({
    category: "",
    description: "",
    emission: "",
  });
  const [activityDate, setActivityDate] = useState<Date | null>(new Date());

  // Populate form fields when initialData changes
  useEffect(() => {
    if (initialData) {
      setForm({
        category: initialData.category || "",
        description: initialData.description || "",
        emission: initialData.emission?.toString() || "",
      });
      setActivityDate(initialData.date ? new Date(initialData.date) : new Date());
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!activityDate) return;
    onSubmit({
      category: form.category,
      description: form.description,
      emission: Number(form.emission),
      date: activityDate.toISOString().split("T")[0], // "YYYY-MM-DD"
    });
    setForm({ category: "", description: "", emission: "" });
    setActivityDate(new Date());
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {mode === "add" ? "Add Activity" : "Edit Activity"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <Input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="rounded-xl"
          />
          <Input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="rounded-xl"
          />
          <Input
            name="emission"
            placeholder="Emission (kg CO₂)"
            type="number"
            value={form.emission}
            onChange={handleChange}
            className="rounded-xl"
          />

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Activity Date</label>
            <DatePicker
              selected={activityDate}
              onChange={(date) => setActivityDate(date)}
              maxDate={new Date()} // Restrict future dates
              dateFormat="yyyy-MM-dd"
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="rounded-xl">
            {isSubmitting ? (mode === "add" ? "Adding..." : "Updating...") : mode === "add" ? "Add" : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};