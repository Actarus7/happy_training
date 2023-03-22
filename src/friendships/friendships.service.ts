import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { Friendship } from './entities/friendship.entity';

@Injectable()
export class FriendshipsService {


  /** Crée une demande d'ami (false par défaut - en attente de l'autre User) */
  async create(userSender: User, userReceiver: User): Promise<Friendship> {
    const newFriendship = new Friendship()

    newFriendship.userSender = userSender;
    newFriendship.userReceiver = userReceiver;


    await newFriendship.save();

    return newFriendship;
  };



  /** Récupère la liste de tous les amis d'un User (pseudos) */
  async findAllPseudosFriends(userId: number, pseudoUser: string): Promise<string[]> {

    const friendships = await Friendship.find({
      relations: {
        userSender: true,
        userReceiver: true
      },
      select: {
        userSender: { pseudo: true },
        userReceiver: { pseudo: true }
      },
      where: [
        { userSender: { id: userId }, status: true },
        { userReceiver: { id: userId }, status: true },
      ],
    });

    // Récupère tous les amis à partir des amitiés (true) récupérées
    if (friendships) {

      const friends = friendships
        // Fait un tableau de tous les pseudos des amis du User (pour chaque amitié, met dans le tableau le pseudo inverse de la demande (sender ou receiver)
        .map(friendship => {
          if (friendship.userReceiver.pseudo === pseudoUser) {
            return friendship.userSender.pseudo;
          };
          return friendship.userReceiver.pseudo;
        });

      return friends;
    };

    return undefined;
  };



  /** Récupère la liste de tous les amis d'un User (users) */
  async findAllFriends(userId: number, pseudoUser: string): Promise<User[]> {

    const friendships = await Friendship.find({
      relations: {
        userSender: true,
        userReceiver: true
      },
      select: {
        userSender: { pseudo: true },
        userReceiver: { pseudo: true }
      },
      where: [
        { userSender: { id: userId }, status: true },
        { userReceiver: { id: userId }, status: true },
      ],
    });

    // Récupère tous les amis à partir des amitiés (true) récupérées
    if (friendships) {

      const friends = friendships
        // Fait un tableau de tous les pseudos des amis du User (pour chaque amitié, met dans le tableau le pseudo inverse de la demande (sender ou receiver)
        .map(friendship => {
          if (friendship.userReceiver.pseudo === pseudoUser) {
            return friendship.userSender;
          };
          return friendship.userReceiver;
        });

      return friends;
    };

    return undefined;
  };


  async findByUserReceiver(userReceiver: string) {
    const waitingFriendships = await Friendship.find({ relations: { userSender: true }, where: { userReceiver: { pseudo: userReceiver }, status: false } });

    return waitingFriendships;

  };



  /** Récupère une demande d'amitié par le demandeur et le receveur */
  async findAllByIds(sender: User, receiver: User): Promise<Friendship> {

    const friendship = await Friendship.findOne({
      where: [
        { userSender: { id: sender.id }, userReceiver: { id: receiver.id } },
        { userSender: { id: receiver.id }, userReceiver: { id: sender.id } },
      ],
    });

    if (friendship) {
      return friendship;
    };

    return undefined;
  };



  /** Récupère une demande d'amitié par son Id */
  async findOneById(id: number): Promise<Friendship> {
    const friendship = await Friendship.find({ relations: { userSender: true, userReceiver: true }, where: { id } });

    if (friendship.length > 0) {
      return friendship[0];
    };

    throw new NotFoundException('Friendship Id inconnu');
  };



  /** Modifie une demande d'ami (Accepter) */
  async update(friendship: Friendship): Promise<Friendship> {

    friendship.status = true;
    friendship.save();

    return friendship;
  };



  /** Supprime une demande d'amitié (Refuser) */
  async remove(id: number): Promise<Friendship> {

    const deleteFriendship = await Friendship.findOneBy({ id });

    deleteFriendship.remove();

    if (deleteFriendship) {
      return deleteFriendship;
    };

    return undefined;
  };


};
