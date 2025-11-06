import { DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { AddCardButton } from '../../components/ui/AddCardButton';
import { Check } from '../../components/ui/Check';
import { ConfirmModal } from '../../components/ui/ConfirmModal';
import { Loading } from '../../components/ui/Loading';
import { ParkCard } from '../../components/ui/ParkCard';
import { Pen } from '../../components/ui/Pen';
import { UnderlineHeader } from '../../components/ui/UnderlineHeader';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import type { Park } from '../types';

export const Portfolio = () => {
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePark, setDeletePark] = useState<Park | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const res = await api.get<Park[]>('/parks');
        setParks(res.data);
      } catch (err) {
        console.error('Error fetching parks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchParks();
  }, []);

  const handleDeleteClick = (park: Park) => {
    setDeletePark(park);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    if (deletePark === null) return;

    try {
      await api.delete(`/parks/${deletePark.id}`);
      setParks((prev) => prev.filter((park) => park.id !== deletePark.id));
      console.log('Deleted park:', deletePark);
    } catch (err) {
      console.error('Error deleting park:', err);
    } finally {
      setDeletePark(null);
      setConfirmOpen(false);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
  );

  const persistOrder = async (ordered: Park[]) => {
    try {
      await api.post(
        '/parks/reorder',
        ordered.map((p, i) => ({ id: p.id, sort_order: i })),
      );
    } catch (err) {
      console.error('Failed to persist parks order:', err);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setParks((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id);
      const newIndex = prev.findIndex((p) => p.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;

      const next = arrayMove(prev, oldIndex, newIndex);

      persistOrder(next);

      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 space-y-16">
      <UnderlineHeader text="Portfolio" withArrow />
      <div className="flex items-center space-x-4">
        <h2 className="text-4xl font-semibold text-center">
          Designing Playgrounds That Inspire Imagination and Outdoor Play
        </h2>
        {user &&
          (isEditMode ? (
            <Check onClick={() => setIsEditMode(false)} className="text-xl" />
          ) : (
            <Pen onClick={() => setIsEditMode(true)} className="text-xl" />
          ))}
      </div>
      {loading ? (
        <Loading />
      ) : parks.length < 1 ? (
        <span className="text-xl text-gray-400">No parks available</span>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={parks.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div className={cn('grid grid-cols-1 max-w-350', 'md:grid-cols-2 lg:grid-cols-4')}>
              {/* ADMIN ONLY --- Add Portfolio Item */}
              {isEditMode && (
                <AddCardButton navigationRoute="/admin/add-edit-park" className="min-w-30 h-50" />
              )}

              {/* Portfolio Items */}
              {parks.map((park) => (
                <ParkCard
                  key={park.id}
                  park={park}
                  disabled={!isEditMode}
                  isEditMode={isEditMode}
                  deleteItem={handleDeleteClick}
                  className="mb-30"
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={confirmOpen}
        message={`Are you sure you want to delete ${deletePark?.title}?`}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
